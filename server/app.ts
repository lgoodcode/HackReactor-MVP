import express, { type NextFunction, type Request, type Response } from 'express'
import session from 'express-session'
import { join } from 'path'
import compression from 'compression'
import cors from 'cors'
import mogan from 'morgan'
import router from './routes'

const app = express()
const isProd = process.env.NODE_ENV === 'production'

if (isProd && !process.env.SESSION_SECRET) {
  throw new Error('Missing SESSION_SECRET environment variable')
} else if (isProd && !process.env.CORS_ORIGIN) {
  throw new Error('Missing CORS_ORIGIN environment variable')
}

app.disable('x-powered-by')
// Set this if the app is behind a proxy to trust the first proxy. If deploying to Netlify,
// this is required since it uses Cloudflare as a proxy.
app.set('trust proxy', 1)
// Only allow requests from the client origin and include credentials for session
app.use(
  cors({
    origin: isProd ? process.env.CORS_ORIGIN : 'http://localhost:3000',
    credentials: true,
  })
)
// Allow preflight requests for all routes
app.options('*', cors())
app.use(compression())
app.use(express.json())
app.use(
  session({
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
)

app.use(mogan(isProd ? 'common' : 'dev'))
app.use('/api', router)
app.use('/', express.static(join(__dirname, 'public'), { maxAge: 31557600000 }))

// eslint-disable-next-line
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not found' })
})

export default app
