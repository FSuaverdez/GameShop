import express from 'express'
import data from './data.js'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Server is Ready')
})

app.get('/api/products', (req, res) => {
  res.send(data.products)
})

app.listen(PORT, () => {
  console.log(`Server listening at port http://localhost:${PORT}`)
})
