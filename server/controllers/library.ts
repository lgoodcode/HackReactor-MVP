import {
  addToLibrary as add,
  updateInLibrary as update,
  removeFromLibrary as remove,
} from '@/models/library'
import type { Request, Response } from 'express'

export const addToLibrary = async (req: Request, res: Response) => {
  const { id } = req.params
  const userId = req.session.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const game = await add(userId, id)

  if (!game) {
    return res.status(400).json({ error: 'Failed to add game to library' })
  }

  // Update the user's library in the session
  req.session?.user?.library.push(game)

  res.status(201).json(game)
}

export const updateInLibrary = async (req: Request, res: Response) => {
  const { id } = req.params
  const { progress } = req.query as { progress: GameProgress | undefined }
  const userId = req.session.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  } else if (!progress) {
    return res.status(400).json({ error: 'Missing progress query value' })
  }

  const game = await update(userId, id, progress)

  if (!game) {
    return res.status(400).json({ error: 'Failed to update game in library' })
  }

  // Update the user's library in the session
  req.session!.user!.library = req.session!.user!.library.map((game) => {
    if (game.game_id === Number(id)) {
      return { ...game, progress }
    }
    return game
  })

  res.status(200).json(game)
}

export const removeFromLibrary = async (req: Request, res: Response) => {
  const { id } = req.params
  const userId = req.session.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const game = await remove(userId, id)

  if (!game) {
    return res.status(400).json({ error: 'Failed to remove game from library' })
  }

  // Update the user's wishlist in the session
  req.session!.user!.library = req.session!.user!.library.filter(
    (game) => game.game_id !== Number(id)
  )

  res.status(200).json(game)
}
