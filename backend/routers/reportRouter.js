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
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate)
    const products = await Product.find()
    const orders = await Order.find()
    const users = await User.find()

    const report = generateReport(products, orders, users, startDate, endDate)

    if (products && orders && users) {
      res.send({ report })
    } else {
      res.status(404).send({ message: 'List Not Found' })
    }
  })
)

const generateReport = (products, orders, users, date1, date2) => {
  const startDate = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  )
  const endDate = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  )

  const totalPaid = Object.values(orders).reduce(
    (t, { totalPrice, isPaid }) => {
      if (isPaid) {
        return t + totalPrice
      }

      return t + 0
    },
    0
  )

  const totalItemsSold = Object.values(orders).reduce((t, { orderItems }) => {
    return t + Object.values(orderItems).reduce((t1, { qty }) => t1 + qty, 0)
  }, 0)

  const pendingPayment = Object.values(orders).reduce((t, { isPaid }) => {
    if (!isPaid) {
      return t + 1
    }

    return t + 0
  }, 0)

  const paidOrders = Object.values(orders).reduce((t, { isPaid }) => {
    if (isPaid) {
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

  const newProducts = products.filter((product) => {
    const date = new Date(product.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= startDate && creationDate <= endDate
  })

  const newOrders = orders.filter((order) => {
    const date = new Date(order.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= startDate && creationDate <= endDate
  })

  const newUsers = users.filter((user) => {
    const date = new Date(user.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= startDate && creationDate <= endDate
  })

  const newPayment = Object.values(newOrders).reduce(
    (t, { totalPrice, isPaid }) => {
      if (isPaid) {
        return t + totalPrice
      }

      return t + 0
    },
    0
  )

  const dateReport = {
    newProducts,
    newOrders,
    newUsers,
    newPayment,
  }

  const productsReport = {
    productNo: products.length,
    products,
  }

  const ordersReport = {
    orderNo: orders.length,
    totalPaid: totalPaid.toFixed(2),
    totalItemsSold,
    paidOrders,
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
    dateReport,
  }
}

export default reportRouter
