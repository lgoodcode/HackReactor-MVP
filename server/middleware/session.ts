import session from 'express-session'
import connectPg from 'connect-pg-simple'
import db from '@/database'

const isProd = process.env.NODE_ENV === 'production'
const pgSession = connectPg(session)

if (isProd && !process.env.SESSION_SECRET) {
  throw new Error('Missing SESSION_SECRET environment variable')
}

export default function SessionMiddleware() {
  return session({
    store: new pgSession({
      pool: db,
      // Prune expired sessions every hour
      pruneSessionInterval: 60 * 60,
      createTableIfMissing: true,
    }),
    secret: isProd ? (process.env.SESSION_SECRET as string) : 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // Need to set to "none" to allow the cookie to be set for cross-origin requests (client origin)
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
      secure: isProd,
    },
  })
}
