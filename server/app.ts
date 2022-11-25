import express, { type NextFunction, type Request, type Response } from 'express'
import { join } from 'path'
import compression from 'compression'
import mogan from 'morgan'
import cors from './middleware/cors'
import session from './middleware/session'
import router from './routes'

const app = express()
const isProd = process.env.NODE_ENV === 'production'

if (isProd && !process.env.CORS_ORIGIN) {
  throw new Error('Missing CORS_ORIGIN environment variable')
}

app.disable('x-powered-by')
// Set this if the app is behind a proxy to trust the first proxy. If deploying to Netlify,
// this is required since it uses Cloudflare as a proxy.
app.set('trust proxy', 1)
cors(app)
app.use(compression())
app.use(express.json())
app.use(session())
app.use(mogan(isProd ? 'common' : 'dev'))
app.use('/api', router)
app.use('/', express.static(join(__dirname, 'public'), { maxAge: 31557600000 }))

// eslint-disable-next-line
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not found' })
})

export default app
