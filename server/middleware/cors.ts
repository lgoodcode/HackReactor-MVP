import cors from 'cors'
import type { Express } from 'express'

const isProd = process.env.NODE_ENV === 'production'

export default function corsMiddleware(app: Express) {
  // Only allow requests from the client origin and include credentials for session
  app.use(
    cors({
      origin: isProd ? process.env.CORS_ORIGIN : 'http://localhost:3000',
      credentials: true,
    })
  )
  // Allow preflight requests for all routes
  app.options('*', cors())
}
