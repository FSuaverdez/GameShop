import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import LoadingBox from '../components/LoadingBox'
function DashboardScreen() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [totalPaid, setPaid] = useState(null)
  const [totalSold, setSold] = useState(null)
  const [toDeliver, setToDeliver] = useState(null)
  const [delivered, setDelivered] = useState(null)
  const [pending, setPending] = useState(null)
  const [paid, setPayed] = useState(null)
  const [loading, setLoading] = useState(true)
  const fetchData = useCallback(async () => {
    const { data } = await axios.get('/list-all')

    setProducts(data.products)
    setOrders(data.orders)
    setUsers(data.users)

    let total = 0
    let sold = 0
    let toDeliv = 0
    let deliv = 0
    let pend = 0
    let payed = 0
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        total += item.qty + item.price
        sold += item.qty
      })
      toDeliv += !order.isDelivered
      deliv += order.isDelivered
      pend += !order.isPaid
      payed += order.isPaid
    })

    setPaid(total)
    setSold(sold)
    setToDeliver(toDeliv)
    setDelivered(deliv)
    setPayed(payed)
    setPending(pend)
    setLoading(false)
  }, [orders])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div>
          <div className='row center'>
            <div className='cart cart-body'>
              <h2>Total Products: {products.length} </h2>
            </div>
            <div className='cart cart-body'>
              <h2>Total Orders: {orders.length}</h2>
            </div>
            <div className='cart cart-body'>
              <h2>Total Users:{users.length} </h2>
            </div>
          </div>
          <div className='row center'>
            <div className='cart cart-body'>
              <h2>Total Payments : $ {totalPaid.toFixed(2)} </h2>
            </div>
            <div className='cart cart-body'>
              <h2>Total Item Sold: {totalSold}</h2>
            </div>
          </div>
          <div className='row center'>
            <div className='cart cart-body'>
              <h2>Products to Deliver:{toDeliver} </h2>
            </div>
            <div className='cart cart-body'>
              <h2>Products Delivered: {delivered}</h2>
            </div>
          </div>
          <div className='row center'>
            <div className='cart cart-body'>
              <h2>Pending Order Payment:{pending} </h2>
            </div>
            <div className='cart cart-body'>
              <h2>Paid Orders: {paid}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardScreen
