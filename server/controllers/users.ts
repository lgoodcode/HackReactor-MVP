import sanitizeHtml from 'sanitize-html'
import { createUser, authenticate } from '@/models/users'
import { Request, Response } from 'express'

export const getSession = async (req: Request, res: Response) => {
  res.status(200).json(req.session.user_id || null)
}

export const logout = async (req: Request, res: Response) => {
  req.session.user_id = null
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

  req.session.user_id = id

  res.status(201).json({ session: req.session.user_id || null })
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

  req.session.user_id = id

  res.status(200).json({ session: req.session.user_id || null })
}
