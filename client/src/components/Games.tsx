import { useState, useEffect } from 'preact/hooks'
import Loader from './Loader'

const RAWG_API_KEY = '0101f4234dc54dfd9fd28541d9b78484'
const PAGE_SIZE = 20

const fetcher = (url: string, query = '') =>
  fetch(url + `?key=${RAWG_API_KEY}&page_size=${PAGE_SIZE}&${query}`)
    .then((res) => res.json())
    .then((res) => res.results)

export default function Games() {
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [cols, setCols] = useState<any[][]>(Array.from<any[][]>({ length: 4 }).map<any[]>(() => []))
  const [page, setPage] = useState(1)
  const loadMore = () => {
    setButtonLoading(true)
    setPage((prevPage) => prevPage + 1)
  }

  // Fetch games whenever the page changes (load more)
  useEffect(() => {
    if (page === 1 && cols[0].length) return

    fetcher('https://api.rawg.io/api/games', `page=${page}`).then((data) => {
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
        <Loader />
      </div>
    )

  return (
    <div className="games-container w-full pb-8">
      <div className="games grid grid-cols-4 gap-6 mb-6">
        {cols.map((games: any[], i) => (
          <div key={i}>
            {games.map((game) => (
              <div
                key={game.id}
                className="card mt-6 transition-all duration-300 hover:scale-[1.03] relative rounded-lg hover:cursor-pointer"
              >
                <div className="card-img overflow-hidden relative w-full h-[180px]">
                  <div
                    className="absolute inset-0 w-full h-full bg-[50%] bg-cover bg-no-repeat rounded-t-lg"
                    style={{ backgroundImage: `url(${game.background_image})` }}
                  />
                </div>

                <div className="card-content py-4 px-2 bg-gray-800 rounded-b-lg">
                  <div className="platforms-and-ratings">
                    <div className="platforms"></div>
                  </div>
                  <div className="name">
                    <h3 className="text-lg font-semibold">{game.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <button className="btn bg-teal-700 px-4 py-2" onClick={loadMore}>
          {buttonLoading ? 'Loading...' : 'Load more'}
        </button>
      </div>
    </div>
  )
}
