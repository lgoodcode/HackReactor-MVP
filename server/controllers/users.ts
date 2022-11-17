import sanitizeHtml from 'sanitize-html'
import { createUser, authenticate } from '@/models/users'
import { Response } from 'express'

export const getSession = async (req: Request, res: Response) => {
  const { user } = req.session

  if (!user) {
    return res.status(200).json(null)
  }

  return req.session
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

  res.sendStatus(201)
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

  res.sendStatus(200)
}
