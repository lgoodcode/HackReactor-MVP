import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import compression from 'compression'

const app = express()
// __dirname alternative since process.env is not available when using "module" type
// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000

app.use(compression())
app.use(express.static(join(__dirname)))

app.get('*', (_, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
