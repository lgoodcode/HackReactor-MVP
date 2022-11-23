import { useState } from 'preact/hooks'
import { useNavigate } from 'react-router-dom'
import SimpleLoader from '@/components/Loaders/Simple'
import LibraryButton from '@/components/Game/LibraryButton'
import { ReactComponent as PlusIcon } from '@/assets/plus.svg'
import { ReactComponent as GiftIcon } from '@/assets/gift.svg'
import './GameCard.css'
import WishlistButton from '../WishlistButton'

export type GameCardProps = {
  game: Game
  session?: boolean
  progress?: GameProgress
  wishlist?: boolean
  menuOpen?: boolean
  setMenuOpen?: (open: boolean) => void
  handleUpdateLibrary: (game: LibraryGame, action: GameAction) => void
  handleUpdateWishlist: (game: WishlistGame, action: GameAction) => void
}

const ICON_SIZE = 16

/**
 * Handles adding, updating, and removing a game to/from the user's library or wishlist.
 * Takes the game id and the type of list to add the game to. If the game was added it
 * will return the game object with the progress set to pending.
 */
function handleGame<T = any>(action: GameAction) {
  return async function (id: number, type: 'library' | 'wishlist', progress?: GameProgress) {
    try {
      // Because the PUT method doesn't use the body, we send the updated progress value
      // as a query parameter.
      const res = await fetch(
        `/api/${type}/${id}${action !== 'update' ? '' : '?progress=' + progress}`,
        {
          method: action === 'add' ? 'POST' : action === 'update' ? 'PUT' : 'DELETE',
        }
      )
      return res.ok ? ((await res.json()) as T) : null
    } catch (err) {
      console.error(err)
      return null
    }
  }
}

export default function GameCard({
  game,
  session,
  progress,
  wishlist,
  handleUpdateLibrary,
  handleUpdateWishlist,
}: GameCardProps) {
  const navigate = useNavigate()
  const [loadingLibrary, setLoadingLibrary] = useState(false)
  const [loadingWishlist, setLoadingWishlist] = useState(false)
  // Handlers to add the game to the library or wishlist and redirects to the login page if not logged in
  const addToLibrary = !session
    ? () => navigate('/login')
    : () => {
        setLoadingLibrary(true)
        handleGame<LibraryGame>('add')(game.id, 'library').then((game) => {
          setLoadingLibrary(false)
          // If the game was returned, it was successful, update the local session state
          if (game) {
            handleUpdateLibrary(game, 'add')
          }
        })
      }
  const updateInLibrary = (progress: GameProgress) => {
    setLoadingLibrary(true)
    handleGame<LibraryGame>('update')(game.id, 'library', progress).then((game) => {
      setLoadingLibrary(false)
      // If the game was returned, it was successfully updated, update the local session state
      if (game) {
        handleUpdateLibrary(game, 'update')
      }
    })
  }
  const removeFromLibrary = () => {
    setLoadingLibrary(true)
    handleGame<LibraryGame>('remove')(game.id, 'library').then((game) => {
      setLoadingLibrary(false)
      // If the game was returned, it was successfully removed, update the local session state
      if (game) {
        handleUpdateLibrary(game, 'remove')
      }
    })
  }
  const addToWishlist = !session
    ? () => navigate('/login')
    : () => {
        setLoadingWishlist(true)
        handleGame<WishlistGame>('add')(game.id, 'wishlist').then((game) => {
          setLoadingWishlist(false)
          // If the game was returned, it was successful, update the local session state
          if (game) {
            handleUpdateWishlist(game, 'add')
          }
        })
      }
  const removeFromWishlist = () => {
    setLoadingWishlist(true)
    handleGame<WishlistGame>('remove')(game.id, 'wishlist').then((game) => {
      setLoadingWishlist(false)
      // If the game was returned, it was successfully removed, update the local session state
      if (game) {
        handleUpdateWishlist(game, 'remove')
      }
    })
  }

  return (
    <div key={game.id} className="game-card">
      <div className="card-img overflow-hidden relative w-full h-[180px]">
        <img
          src={game.background_image}
          alt={game.name}
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
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

        <div className="game-options flex mt-4 gap-2">
          {!progress ? (
            <div className="add-to-library game-card-btn" onClick={addToLibrary}>
              {loadingLibrary ? (
                <SimpleLoader w={ICON_SIZE} h={ICON_SIZE} />
              ) : (
                <PlusIcon width={ICON_SIZE} height={ICON_SIZE} className="fill-white" />
              )}
            </div>
          ) : (
            <LibraryButton
              gameId={game.id}
              progress={progress}
              update={updateInLibrary}
              remove={removeFromLibrary}
            />
          )}
          {!wishlist ? (
            <div className="add-to-wishlist game-card-btn" onClick={addToWishlist}>
              {loadingWishlist ? (
                <SimpleLoader w={ICON_SIZE} h={ICON_SIZE} />
              ) : (
                <GiftIcon width={ICON_SIZE} height={ICON_SIZE} className="fill-white" />
              )}
            </div>
          ) : (
            <WishlistButton remove={removeFromWishlist} />
          )}
        </div>
      </div>
    </div>
  )
}
