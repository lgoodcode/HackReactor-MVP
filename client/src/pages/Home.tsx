import { useState, useEffect } from 'preact/hooks'
import GameCard from '@/components/Game/GameCard'
import Filter from '@/components/Filter'
import CrossLoader from '@/components/Loaders/Cross'
import SimpleLoader from '@/components/Loaders/Simple'
import { useStore } from '@/lib/fastContext'
import fetcher from '@/utils/fetcher'

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY
const RAWG_API_ENDPOINT = 'https://api.rawg.io/api/games'
const IS_MOBILE = window.matchMedia('(max-width: 640px)').matches
const PAGE_SIZE = IS_MOBILE ? 15 : 32
// TODO: set the number of columns based on the screen size
const NUM_COLS = 4
const ORDERINGS: Ordering[] = [
  { id: 1, name: 'Popular', unavailable: false, value: 'none' },
  { id: 2, name: 'Highest Rating', unavailable: false, value: '-rating' },
  { id: 3, name: 'Lowest Rating', unavailable: false, value: 'rating' },
  { id: 4, name: 'Newest', unavailable: false, value: '-released' },
  { id: 5, name: 'Oldest', unavailable: false, value: 'released' },
]

const fetchGames = async (page = 1, ordering: RAWG_ORDERING = 'none') => {
  const { data, error } = await fetcher<RAWGQuery>(
    RAWG_API_ENDPOINT +
      `?key=${RAWG_API_KEY}&ordering=${ordering}&page_size=${PAGE_SIZE}&page=${page}`
  )

  if (error) {
    console.error(error)
    return []
  }
  return data.results
}

export default function Games() {
  const [session, setSession] = useStore<Session>('session')
  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [ordering, setOrdering] = useState(ORDERINGS[0])
  const [page, setPage] = useState(1)
  const [cols, setCols] = useState<Game[][]>(
    Array.from<Game[][]>({ length: NUM_COLS }).map<Game[]>(() => [])
  )

  // Need to set the title in case redirected from other pages
  document.title = import.meta.env.VITE_APP_TITLE

  /** Handles fetching more games from the API and adding them to the grid */
  const handleLoadMore = () => {
    setButtonLoading(true)
    setPage((prevPage) => prevPage + 1)
  }

  /** Handles changing the ordering of the games */
  const handleOrderingChange = (order: Ordering) => {
    setOrdering(order)
    setPage(1)
  }

  /** Handles updating the local session state when the user modifies their library */
  const updateSessionLibrary = (game: LibraryGame, action: GameAction) => {
    if (action === 'add') {
      setSession({ ...session!, library: session!.library.concat(game) })
    } else if (action === 'update') {
      setSession({
        ...session!,
        library: session!.library.map((g) =>
          game.game_id !== g.game_id
            ? g
            : {
                ...g,
                progress: game.progress,
              }
        ),
      })
    } else if (action === 'remove') {
      setSession({
        ...session!,
        library: session!.library.filter((g) => g.game_id !== game.game_id),
      })
    }
  }

  /** Handles updating the local session state when the user adds or removes a game to their wishlist */
  const updateSessionWishlist = (game: WishlistGame, action: GameAction) => {
    if (action === 'add') {
      setSession({ ...session!, wishlist: session!.wishlist.concat(game) })
    } else if (action === 'remove') {
      setSession({
        ...session!,
        wishlist: session!.wishlist.filter((g) => g.game_id !== game.game_id),
      })
    }
  }

  /**
   * Fetch games whenever the page changes. This is done by checking when the button loading
   * is changed, rather than the page changing because the page change is also triggered for
   * the ordering change.
   */
  useEffect(() => {
    if (page === 1 && cols[0].length) return
    // Fetch from the api, specifying the page
    // TODO: add ordering for the filter
    fetchGames(page, ordering.value).then((games) => {
      for (let i = (page - 1) * PAGE_SIZE, j = 0; j < games.length; i++, j++) {
        cols[i % cols.length][i] = games[j]
      }

      setLoading(false)
      setButtonLoading(false)
      setCols(cols)
    })
  }, [buttonLoading])

  /** Fetch games whenever the ordering changes */
  useEffect(() => {
    if (!cols[0].length) return

    setFetching(true)

    fetchGames(page, ordering.value).then((games) => {
      // Manually reset the columns to prevent showing the old games of additional
      // pages of the previous ordering
      cols.forEach((col) => (col.length = 0))

      for (let i = (page - 1) * PAGE_SIZE, j = 0; j < games.length; i++, j++) {
        cols[i % cols.length][i] = games[j]
      }
      setFetching(false)
      setCols(cols)
    })
  }, [ordering])

  if (loading) {
    return (
      // Adjust for the navbar offest
      <div className="w-full h-full centered relative -top-[84px]">
        <CrossLoader />
      </div>
    )
  }

  return (
    <section className="games-container w-full py-12 lg:py-24 px-6 md:px-12 lg:px-44 flex flex-col flex-grow">
      <div className="filtering mb-2 w-64">
        <Filter data={ORDERINGS} selected={ordering} setSelected={handleOrderingChange} />
      </div>

      {fetching ? (
        <div className="centered flex-grow">
          <CrossLoader />
        </div>
      ) : (
        <div className="games grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {cols.map((games, i) => (
            <div key={i}>
              {games.map((game) => {
                // TODO: add state to manage which games were already checked when loading more
                if (!session)
                  return (
                    <GameCard
                      key={game.id}
                      game={game}
                      updateSessionLibrary={updateSessionLibrary}
                      updateSessionWishlist={updateSessionWishlist}
                    />
                  )

                // Check if the game is in the library and the wishlist
                const library = session.library.find((g) => g.game_id === game.id)
                const wishlist = session.wishlist.find((g) => g.game_id === game.id)

                return (
                  <GameCard
                    key={game.id}
                    game={game}
                    session={true}
                    progress={library?.progress}
                    wishlist={Boolean(wishlist)}
                    updateSessionLibrary={updateSessionLibrary}
                    updateSessionWishlist={updateSessionWishlist}
                  />
                )
              })}
            </div>
          ))}
        </div>
      )}

      {!fetching && (
        <div className="w-full flex justify-center">
          <button
            className="btn w-36 px-6 py-3 rounded-md centered bg-lavender-500 hover:bg-lavender-400"
            onClick={handleLoadMore}
          >
            {buttonLoading ? <SimpleLoader /> : 'Load more'}
          </button>
        </div>
      )}
    </section>
  )
}
