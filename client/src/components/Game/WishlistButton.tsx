import { ReactComponent as GiftIcon } from '@/assets/gift.svg'

export type WishlistButtonProps = {
  remove: () => void
}

export default function WishlistButton({ remove }: WishlistButtonProps) {
  return (
    <div
      onClick={remove}
      className="wished game-card-btn centered gap-2 !bg-lavender-500 hover:!bg-lavender-400"
    >
      <GiftIcon width={16} height={16} className="fill-white pointer-events-none" />
    </div>
  )
}
