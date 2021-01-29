import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js'

const reportRouter = express.Router()
reportRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find()
    const orders = await Order.find()
    const users = await User.find()

    const report = generateReport(products, orders, users)

    if (products && orders && users) {
      res.send({ report })
    } else {
      res.status(404).send({ message: 'List Not Found' })
    }
  })
)

const generateReport = (products, orders, users) => {
  const totalPaid = Object.values(orders).reduce(
    (t, { totalPrice, isPaid }) => {
      if (isPaid) {
        return t + totalPrice
      }

      return t + 0
    },
    0
  )

  const pendingPayment = Object.values(orders).reduce((t, { isPaid }) => {
    if (!isPaid) {
      return t + 1
    }

    return t + 0
  }, 0)

  const toDeliver = Object.values(orders).reduce(
    (t, { isDelivered }) => (isDelivered ? t + 0 : t + 1),
    0
  )

  const delivered = Object.values(orders).reduce(
    (t, { isDelivered }) => (isDelivered ? t + 1 : t + 0),
    0
  )

  const productsReport = {
    productNo: products.length,
    products,
  }

  const ordersReport = {
    orderNo: orders.length,
    totalPaid: totalPaid.toFixed(2),
    pendingPayment,
    delivered,
    toDeliver,
    orders,
  }

  const usersReport = {
    userNo: users.length,
    users,
  }

  return {
    productsReport,
    ordersReport,
    usersReport,
  }
}

export default reportRouter
