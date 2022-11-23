import { ReactComponent as GiftIcon } from '@/assets/gift.svg'
import SimpleLoader from '@/components/Loaders/Simple'

export type WishlistButtonProps = {
  loading: boolean
  added: boolean
  add: () => void
  remove: () => void
}

const ICON_SIZE = 16

export default function WishlistButton({ loading, added, add, remove }: WishlistButtonProps) {
  if (!added) {
    return (
      <div className="add-to-wishlist game-card-btn" onClick={add}>
        {loading ? (
          <SimpleLoader w={ICON_SIZE} h={ICON_SIZE} />
        ) : (
          <GiftIcon width={ICON_SIZE} height={ICON_SIZE} className="fill-white" />
        )}
      </div>
    )
  }

  return (
    <div
      onClick={remove}
      className="wished game-card-btn centered gap-2 !bg-lavender-500 hover:!bg-lavender-400"
    >
      <GiftIcon width={ICON_SIZE} height={ICON_SIZE} className="fill-white pointer-events-none" />
    </div>
  )
}
