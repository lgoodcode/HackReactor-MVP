import { useState } from 'preact/hooks'
import { useNavigate } from 'react-router-dom'
import SimpleLoader from '../Loaders/Simple'
import { useStore } from '@/utils/fastContext'
import { ReactComponent as PlusIcon } from '@/assets/plus.svg'
import { ReactComponent as GiftIcon } from '@/assets/gift.svg'
import { ReactComponent as CheckIcon } from '@/assets/check.svg'
import { ReactComponent as GamepadIcon } from '@/assets/gamepad.svg'
import './GameCard.css'

export type GameCardProps = {
  game: Game
  session?: boolean
  library?: GameProgress
  wishlist?: boolean
  handleUpdateLibrary?: (game: LibraryGame) => void
  handleUpdateWishlist?: (game: WishlistGame) => void
}

const handleAdd = async (id: number, type: 'library' | 'wishlist') => {
  try {
    const res = await fetch(`/api/${type}/${id}`, { method: 'POST' })

    if (!res.ok) return null
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

export default function GameCard({
  game,
  session,
  library,
  wishlist,
  handleUpdateLibrary,
  handleUpdateWishlist,
}: GameCardProps) {
  const navigate = useNavigate()
  const [loadingAddToLibrary, setLoadingAddToLibrary] = useState(false)
  const [loadingAddToWishlist, setLoadingAddToWishlist] = useState(false)
  // Handlers to add the game to the library or wishlist and redirects to the login page if not logged in
  const handleAddToLibrary = !session
    ? () => navigate('/login')
    : () => {
        setLoadingAddToLibrary(true)
        handleAdd(game.id, 'library').then((game) => {
          setLoadingAddToLibrary(false)

          if (game) {
            handleUpdateLibrary!(game)
          }
        })
      }
  const handleAddToWishlist = !session
    ? () => navigate('/login')
    : () => {
        setLoadingAddToWishlist(true)
        handleAdd(game.id, 'wishlist').then((game) => {
          setLoadingAddToWishlist(false)

          if (game) {
            handleUpdateWishlist!(game)
          }
        })
      }

  return (
    <div key={game.id} className="game-card">
      <div className="card-img overflow-hidden relative w-full h-[180px]">
        {/* Using background-image over an img because of the fact that the image will be
            restricted to the parent's dimensions. */}
        <div
          className="absolute inset-0 w-full h-full bg-[50%] bg-cover bg-no-repeat rounded-t-lg"
          style={{ backgroundImage: `url(${game.background_image})` }}
        />
      </div>

      <div className="game-card-content p-4 bg-purple-800 rounded-b-lg">
        <div className="name-and-rating">
          <div className="flex flex-row justify-between relative">
            <h3 className="text-lg font-semibold font-mont break-words w-[calc(100%-42px)]">
              {game.name}
            </h3>

            {game.metacritic && (
              <div
                data-tooltip="Metascore"
                className={`metacritic absolute right-0 p-[1px] px-1 border-[1px] rounded-md ${
                  game.metacritic > 80
                    ? 'border-green-600'
                    : game.metacritic > 60
                    ? 'border-yellow-500'
                    : 'border-red-600'
                }`}
              >
                <span
                  className={`text-sm ${
                    game.metacritic > 80
                      ? 'text-green-500'
                      : game.metacritic > 60
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {game.metacritic}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="game-options mt-4">
          {!library ? (
            <div className="add-to-library game-card-btn" onClick={handleAddToLibrary}>
              {loadingAddToLibrary ? (
                <SimpleLoader w={16} h={16} />
              ) : (
                <PlusIcon width={16} height={16} className="fill-white" />
              )}
            </div>
          ) : (
            <div className="game-status game-card-btn centered gap-2 !bg-green-600 hover:!bg-green-500">
              <CheckIcon width={16} height={16} className="fill-white" />
              <div className="border-l">
                <GamepadIcon width={16} height={16} className="fill-white ml-2" />
              </div>
            </div>
          )}

          <div className="add-to-wishlist game-card-btn ml-2" onClick={handleAddToWishlist}>
            {loadingAddToWishlist ? (
              <SimpleLoader w={16} h={16} />
            ) : (
              <GiftIcon width={16} height={16} className="fill-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
