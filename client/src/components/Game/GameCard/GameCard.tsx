import { useState } from 'preact/hooks'
import { useNavigate } from 'react-router-dom'
import LibraryButton from '@/components/Game/LibraryButton'
import WishlistButton from '@/components/Game/WishlistButton'
import handleGame from '@/utils/handleGame'
import './GameCard.css'

export type GameCardProps = {
  game: Game
  session?: boolean
  progress?: GameProgress
  wishlist?: boolean
  menuOpen?: boolean
  setMenuOpen?: (open: boolean) => void
  updateSessionLibrary: (game: LibraryGame, action: GameAction) => void
  updateSessionWishlist: (game: WishlistGame, action: GameAction) => void
}

export default function GameCard({
  game,
  session,
  progress,
  wishlist,
  updateSessionLibrary,
  updateSessionWishlist,
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
            updateSessionLibrary(game, 'add')
          }
        })
      }
  const updateInLibrary = (progress: GameProgress) => {
    setLoadingLibrary(true)
    handleGame<LibraryGame>('update')(game.id, 'library', progress).then((game) => {
      setLoadingLibrary(false)
      // If the game was returned, it was successfully updated, update the local session state
      if (game) {
        updateSessionLibrary(game, 'update')
      }
    })
  }
  const removeFromLibrary = () => {
    setLoadingLibrary(true)
    handleGame<LibraryGame>('remove')(game.id, 'library').then((game) => {
      setLoadingLibrary(false)
      // If the game was returned, it was successfully removed, update the local session state
      if (game) {
        updateSessionLibrary(game, 'remove')
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
            updateSessionWishlist(game, 'add')
          }
        })
      }
  const removeFromWishlist = () => {
    setLoadingWishlist(true)
    handleGame<WishlistGame>('remove')(game.id, 'wishlist').then((game) => {
      setLoadingWishlist(false)
      // If the game was returned, it was successfully removed, update the local session state
      if (game) {
        updateSessionWishlist(game, 'remove')
      }
    })
  }

  return (
    <div key={game.id} className="game-card min-w-[240px]">
      <div className="card-img overflow-hidden relative w-full h-[180px] sm:h-[240px] xl:h-[180px]">
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
                className={`metacritic absolute right-0 p-[1px] px-1 border-[1px] rounded-md select-none ${
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
          <LibraryButton
            gameId={game.id}
            loading={loadingLibrary}
            progress={progress}
            add={addToLibrary}
            update={updateInLibrary}
            remove={removeFromLibrary}
          />
          <WishlistButton
            loading={loadingWishlist}
            added={Boolean(wishlist)}
            add={addToWishlist}
            remove={removeFromWishlist}
          />
        </div>
      </div>
    </div>
  )
}
