import { addToWishlist as add, removeFromWishlist as remove } from '@/models/wishlist'
import type { Request, Response } from 'express'

export const addToWishlist = async (req: Request, res: Response) => {
  const { id } = req.params
  const userId = req.session.user?.id

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const game = await add(userId, id)

  if (!game) {
    return res.status(400).json({ message: 'Failed to add game to wishlist' })
  }

  // Update the user's wishlist in the session
  req.session?.user?.wishlist.push(game)

  res.status(201).json(game)
}

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { id } = req.params
  const userId = req.session.user?.id

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const game = await remove(userId, id)

  if (!game) {
    return res.status(400).json({ message: 'Failed to remove game from wishlist' })
  }

  // Update the user's wishlist in the session
  req.session!.user!.wishlist = req.session!.user!.wishlist.filter(
    (game) => game.game_id !== Number(id)
  )

  res.status(200).json(game)
}
