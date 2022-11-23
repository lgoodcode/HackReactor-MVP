import { useState, useEffect } from 'preact/hooks'
import GameCard from '@/components/Game/GameCard'
import Filter from '@/components/Filter'
import CrossLoader from '@/components/Loaders/Cross'
import SimpleLoader from '@/components/Loaders/Simple'
import { useStore } from '@/lib/fastContext'

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY
const RAWG_API_ENDPOINT = 'https://api.rawg.io/api/games'
const PAGE_SIZE = 32
// TODO: set the number of columns based on the screen size
const NUM_COLS = 4
const ordering: Ordering[] = [
  { id: 1, name: 'Highest Rating', unavailable: false },
  { id: 2, name: 'Lowest Rating', unavailable: false },
  { id: 3, name: 'Newest', unavailable: false },
  { id: 4, name: 'Oldest', unavailable: false },
]

const gameFetcher = (query = '') =>
  fetch(RAWG_API_ENDPOINT + `?key=${RAWG_API_KEY}&page_size=${PAGE_SIZE}&${query}`)
    .then((res) => res.json())
    .then((res) => res.results)

export default function Games() {
  const [session, setSession] = useStore<Session>('session')
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [selected, setSelected] = useState(ordering[0])
  const [page, setPage] = useState(1)
  const [cols, setCols] = useState<Game[][]>(
    Array.from<Game[][]>({ length: NUM_COLS }).map<Game[]>(() => [])
  )

  // Need to set the title in case redirected from other pages
  document.title = import.meta.env.VITE_APP_TITLE

  /**
   * Handles fetching more games from the API and adding them to the grid.
   */
  const handleLoadMore = () => {
    setButtonLoading(true)
    setPage((prevPage) => prevPage + 1)
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

  /** Fetch games whenever the page changes (load more function) */
  useEffect(() => {
    if (page === 1 && cols[0].length) return
    // Fetch from the api, specifying the page
    // TODO: add ordering for the filter
    gameFetcher(`page=${page}`).then((data) => {
      for (let i = (page - 1) * PAGE_SIZE, j = 0; j < data.length; i++, j++) {
        cols[i % cols.length].push(data[j])
      }

      setLoading(false)
      setButtonLoading(false)
      setCols(cols)
    })
  }, [page])

  if (loading) {
    return (
      // Adjust for the navbar offest
      <div className="w-full h-full centered relative -top-[84px]">
        <CrossLoader />
      </div>
    )
  }

  return (
    <section className="games-container w-full py-24">
      <div className="filtering mb-2 w-64">
        <Filter data={ordering} selected={selected} setSelected={setSelected} />
      </div>

      <div className="games grid grid-cols-4 gap-6 mb-16">
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

      <div className="w-full flex justify-center">
        <button
          className="btn w-36 px-6 py-3 rounded-md centered bg-lavender-500 hover:bg-lavender-400"
          onClick={handleLoadMore}
        >
          {buttonLoading ? <SimpleLoader /> : 'Load more'}
        </button>
      </div>
    </section>
  )
}
