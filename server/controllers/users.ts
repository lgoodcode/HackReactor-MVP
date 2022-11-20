import sanitizeHtml from 'sanitize-html'
import { createUser, authenticate } from '@/models/users'
import { getLibrary } from '@/models/library'
import { getWishlist } from '@/models/wishlist'
import type { Request, Response } from 'express'

export const getSession = (req: Request, res: Response) => {
  res.status(200).json(req.session.user ?? null)
}

export const logout = async (req: Request, res: Response) => {
  req.session.user = null
  res.sendStatus(200)
}

// Create a new user or authenticate an existing user. Sets the user id in the session if successful.

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    console.error('Missing email or password')
    return res.status(400).json({ error: 'Missing email or password' })
  }

  const id = await createUser(sanitizeHtml(email), sanitizeHtml(password))

  if (!id) {
    return res.status(400).json({ error: 'Email already in use' })
  }

  const library = await getLibrary(id)
  const wishlist = await getWishlist(id)

  req.session.user = {
    id,
    library,
    wishlist,
  }
  res.status(201).json(req.session.user)
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    console.error('Missing email or password')
    return res.status(400).json({ error: 'Missing email or password' })
  }

  const id = await authenticate(sanitizeHtml(email), sanitizeHtml(password))

  if (!id) {
    return res.status(400).json({ error: 'Invalid email or password' })
  }

  const library = (await getLibrary(id)) || []
  const wishlist = (await getWishlist(id)) || []

  req.session.user = {
    id,
    library,
    wishlist,
  }
  res.status(200).json(req.session.user)
}
