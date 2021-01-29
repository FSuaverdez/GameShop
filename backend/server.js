import express from 'express'
import mongoose from 'mongoose'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js'
import path from 'path'
import uploadRouter from './routers/uploadRouter.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import User from './models/userModel.js'
import reportRouter from './routers/reportRouter.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
app.use('/api/uploads', uploadRouter)

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/reports', reportRouter)

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.get('/', async (req, res) => {
  res.send('Server is ready')
})
app.get('/list-all', async (req, res) => {
  const products = await Product.find()
  const orders = await Order.find()
  const users = await User.find()

  if (products && orders && users) {
    res.send({ products, orders, users })
  } else {
    res.status(404).send({ message: 'List Not Found' })
  }
})
//middleware/error catcher
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`)
})
