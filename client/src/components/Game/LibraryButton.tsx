import { useStore } from '@/lib/fastContext'
import SimpleLoader from '@/components/Loaders/Simple'
import { ReactComponent as PlusIcon } from '@/assets/plus.svg'
import { ReactComponent as GamepadIcon } from '@/assets/gamepad.svg'

export type LibraryButtonProps = {
  gameId: number
  loading: boolean
  progress: GameProgress | undefined
  add: () => void
  update: (progress: GameProgress) => void
  remove: () => void
}

const ICON_SIZE = 16

export default function LibraryButton({
  gameId,
  loading,
  progress,
  add,
  update,
  remove,
}: LibraryButtonProps) {
  const [menu, setMenu] = useStore<LibraryMenu>('libraryMenu')
  const handleLibraryMenu = (e: MouseEvent) => {
    setMenu({
      ...menu,
      open: true,
      gameId,
      progress: progress!,
      x: e.pageX,
      y: e.pageY,
      update,
      remove,
    })
  }

  if (!progress) {
    return (
      <div className="add-to-library game-card-btn" onClick={add}>
        {loading ? (
          <SimpleLoader w={ICON_SIZE} h={ICON_SIZE} />
        ) : (
          <PlusIcon width={ICON_SIZE} height={ICON_SIZE} className="fill-white" />
        )}
      </div>
    )
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
      {loading ? (
        <SimpleLoader w={ICON_SIZE} h={ICON_SIZE} />
      ) : (
        <GamepadIcon
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="fill-white pointer-events-none"
        />
      )}
    </div>
  )
}
