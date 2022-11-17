import { Pool } from 'pg'

const isDev = process.env.NODE_ENV !== 'production'
// Reads the environment variables for connection information
const db = new Pool({
  host: isDev ? 'localhost' : process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: isDev ? 5432 : Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

// Gracefully handle closing database connection when server shuts down
process.on('SIGTERM', () => {
  db.end()
})

export default db
