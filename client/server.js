/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import compression from 'compression'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000

app.use(compression())
app.use(express.static(join(__dirname)))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
