import { addToLibrary as add } from '@/models/library'
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
