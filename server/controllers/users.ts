import sanitizeHtml from 'sanitize-html'
import { createUser, authenticate } from '@/models/users'
import type { Request, Response } from 'express'

export const logout = async (req: Request, res: Response) => {
  req.session.user = null
  res.cookie('session', null, { maxAge: 0 })
  res.sendStatus(200)
}

// Create a new user or authenticate an existing user. Sets the user id in the session if successful.

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    console.error('Missing email or password')
    return res.status(400).json({ error: 'Missing email or password' })
  }

  const user = await createUser(sanitizeHtml(email), sanitizeHtml(password))

  if (!user) {
    return res.status(400).json({ error: 'Email already in use' })
  }

  req.session.user = user
  res.cookie('session', JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24 * 7 })
  res.status(201).json({ session: user || null })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    console.error('Missing email or password')
    return res.status(400).json({ error: 'Missing email or password' })
  }

  const user = await authenticate(sanitizeHtml(email), sanitizeHtml(password))

  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' })
  }

  req.session.user = user
  res.cookie('session', JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24 * 7 })
  res.status(200).json({ session: user || null })
}
