import { ReactComponent as GamepadIcon } from '@/assets/gamepad.svg'
import { useStore } from '@/lib/fastContext'

export type GameLibraryMenuProps = {
  gameId: number
  progress: GameProgress
}

export default function GameLibraryMenu({ gameId, progress }: GameLibraryMenuProps) {
  const [menu, setMenu] = useStore<LibraryMenu>('libraryMenu')
  const handleLibraryMenu = (e: MouseEvent) => {
    setMenu({
      ...menu,
      open: true,
      gameId,
      progress,
      x: e.pageX,
      y: e.pageY,
    })
  }

  return (
    <div
      onClick={handleLibraryMenu}
      className={`game-status game-card-btn centered gap-2 ${
        progress === 'pending'
          ? '!bg-yellow-600 hover:!bg-yellow-500'
          : progress === 'in progress'
          ? '!bg-sky-600 hover:!bg-sky-500'
          : '!bg-green-600 hover:!bg-green-500'
      }`}
    >
      <GamepadIcon width={16} height={16} className="fill-white pointer-events-none" />
    </div>
  )
}
