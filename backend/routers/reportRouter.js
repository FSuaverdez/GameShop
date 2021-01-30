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
      res.status(404).send({ message: 'Report Not Found' })
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

  const d1 = new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
  const d2 = new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)
  const d3 = new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000)
  const d4 = new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)
  const d5 = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
  const d6 = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
  const d7 = new Date()

  const day1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate())
  const day2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate())
  const day3 = new Date(d3.getFullYear(), d3.getMonth(), d3.getDate())
  const day4 = new Date(d4.getFullYear(), d4.getMonth(), d4.getDate())
  const day5 = new Date(d5.getFullYear(), d5.getMonth(), d5.getDate())
  const day6 = new Date(d6.getFullYear(), d6.getMonth(), d6.getDate())
  const day7 = new Date(d7.getFullYear(), d7.getMonth(), d7.getDate())

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

  const day1Orders = orders.filter((order) => {
    const date = new Date(order.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= day1 && creationDate < day2
  })
  const day2Orders = orders.filter((order) => {
    const date = new Date(order.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= day2 && creationDate < day3
  })
  const day3Orders = orders.filter((order) => {
    const date = new Date(order.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= day3 && creationDate < day4
  })
  const day4Orders = orders.filter((order) => {
    const date = new Date(order.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= day4 && creationDate < day5
  })
  const day5Orders = orders.filter((order) => {
    const date = new Date(order.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= day5 && creationDate < day6
  })
  const day6Orders = orders.filter((order) => {
    const date = new Date(order.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= day6 && creationDate < day7
  })
  const day7Orders = orders.filter((order) => {
    const date = new Date(order.createdAt)
    const creationDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return creationDate >= day7
  })

  console.log(
    day1Orders,
    day2Orders,
    day3Orders,
    day4Orders,
    day5Orders,
    day6Orders,
    day7Orders
  )

  const day1Sales = Object.values(day1Orders).reduce(
    (t, { totalPrice, isPaid }) => {
      if (isPaid) {
        return t + totalPrice
      }

      return t + 0
    },
    0
  )
  const day2Sales = Object.values(day2Orders).reduce(
    (t, { totalPrice, isPaid }) => {
      if (isPaid) {
        return t + totalPrice
      }

      return t + 0
    },
    0
  )
  const day3Sales = Object.values(day3Orders).reduce(
    (t, { totalPrice, isPaid }) => {
      if (isPaid) {
        return t + totalPrice
      }

      return t + 0
    },
    0
  )
  const day4Sales = Object.values(day4Orders).reduce(
    (t, { totalPrice, isPaid }) => {
      if (isPaid) {
        return t + totalPrice
      }

      return t + 0
    },
    0
  )
  const day5Sales = Object.values(day5Orders).reduce(
    (t, { totalPrice, isPaid }) => {
      if (isPaid) {
        return t + totalPrice
      }

      return t + 0
    },
    0
  )
  const day6Sales = Object.values(day6Orders).reduce(
    (t, { totalPrice, isPaid }) => {
      if (isPaid) {
        return t + totalPrice
      }

      return t + 0
    },
    0
  )
  const day7Sales = Object.values(day7Orders).reduce(
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
    salesReport: {
      day1Sales: {
        date: new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() + 1),
        day1Sales: day1Sales.toFixed(2),
      },
      day2Sales: {
        date: new Date(d2.getFullYear(), d2.getMonth(), d2.getDate() + 1),
        day2Sales: day2Sales.toFixed(2),
      },
      day3Sales: {
        date: new Date(d3.getFullYear(), d3.getMonth(), d3.getDate() + 1),
        day3Sales: day3Sales.toFixed(2),
      },
      day4Sales: {
        date: new Date(d4.getFullYear(), d4.getMonth(), d4.getDate() + 1),
        day4Sales: day4Sales.toFixed(2),
      },
      day5Sales: {
        date: new Date(d5.getFullYear(), d5.getMonth(), d5.getDate() + 1),
        day5Sales: day5Sales.toFixed(2),
      },
      day6Sales: {
        date: new Date(d6.getFullYear(), d6.getMonth(), d6.getDate() + 1),
        day6Sales: day6Sales.toFixed(2),
      },
      day7Sales: {
        date: new Date(d7.getFullYear(), d7.getMonth(), d7.getDate() + 1),
        day7Sales: day7Sales.toFixed(2),
      },
    },
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
