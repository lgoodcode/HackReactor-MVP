import { useState, useEffect } from 'preact/hooks'
import GameCard from '../components/GameCard'
import Filter from '../components/Filter'
import CrossLoader from '../components/Loaders/Cross'
import SimpleLoader from '../components/Loaders/Simple'

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY
const RAWG_API_ENDPOINT = 'https://api.rawg.io/api/games'
const PAGE_SIZE = 30
const ordering: Ordering[] = [
  { id: 1, name: 'Highest Rating', unavailable: false },
  { id: 2, name: 'Lowest Rating', unavailable: false },
  { id: 3, name: 'Newest', unavailable: false },
  { id: 4, name: 'Oldest', unavailable: false },
]

const fetcher = (url: string, query = '') =>
  fetch(url + `?key=${RAWG_API_KEY}&page_size=${PAGE_SIZE}&${query}`)
    .then((res) => res.json())
    .then((res) => res.results)

export default function Games({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [selected, setSelected] = useState(ordering[0])
  const [page, setPage] = useState(1)
  const [cols, setCols] = useState<Game[][]>(
    Array.from<Game[][]>({ length: 4 }).map<Game[]>(() => [])
  )

  // Need to set the title in case redirected from other pages
  document.title = 'MVP'

  const handleLoadMore = () => {
    setButtonLoading(true)
    setPage((prevPage) => prevPage + 1)
  }

  // Fetch games whenever the page changes (load more)
  useEffect(() => {
    if (page === 1 && cols[0].length) return

    fetcher(RAWG_API_ENDPOINT, `page=${page}`).then((data) => {
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
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <button
          className="btn bg-lavender-500 hover:bg-lavender-400 px-6 py-3 rounded-md centered w-36"
          onClick={handleLoadMore}
        >
          {buttonLoading ? <SimpleLoader /> : 'Load more'}
        </button>
      </div>
    </section>
  )
}
