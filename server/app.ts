import express from 'express'
import session from 'express-session'
import { join } from 'path'
import compression from 'compression'
import router from './routes'

const app = express()

if (!process.env.SESSION_SECRET) {
  throw new Error('Missing SESSION_SECRET environment variable')
}

app.use(compression())
app.use(express.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
      secure: process.env.NODE_ENV === 'production',
    },
  })
)

app.use('/api', router)
app.use('/', express.static(join(__dirname, 'public'), { maxAge: 31557600000 }))

// eslint-disable-next-line
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not found' })
})

export default app
