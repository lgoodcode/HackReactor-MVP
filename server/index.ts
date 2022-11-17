import app from './app'

const PORT = process.env.PORT || 4000

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`)
)
