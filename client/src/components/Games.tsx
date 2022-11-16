import { useState, useEffect } from 'preact/hooks'
import GameCard from './GameCard'
import CrossLoader from './Loaders/Cross'
import SimpleLoader from './Loaders/Simple'

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY
const RAWG_API_ENDPOINT = 'https://api.rawg.io/api/games'
const PAGE_SIZE = 20

const fetcher = (url: string, query = '') =>
  fetch(url + `?key=${RAWG_API_KEY}&page_size=${PAGE_SIZE}&${query}`)
    .then((res) => res.json())
    .then((res) => res.results)

export default function Games() {
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [cols, setCols] = useState<Game[][]>(
    Array.from<Game[][]>({ length: 4 }).map<Game[]>(() => [])
  )
  const [page, setPage] = useState(1)
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

  if (loading)
    return (
      <div className="w-full h-full centered">
        <CrossLoader />
      </div>
    )

  return (
    <div className="games-container w-full pb-16">
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
          className="btn bg-cool-500 hover:bg-cool-400 px-6 py-3 rounded-md centered w-36"
          onClick={handleLoadMore}
        >
          {buttonLoading ? <SimpleLoader /> : 'Load more'}
        </button>
      </div>
    </div>
  )
}
