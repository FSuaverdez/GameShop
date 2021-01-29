import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux'
import { listReport } from '../actions/reportActions'
import MessageBox from '../components/MessageBox'
function DashboardScreen() {
  const dispatch = useDispatch()
  const reportList = useSelector((state) => state.reportList)
  const { loading, error, report } = reportList
  const [startDate, setStartDate] = useState(
    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
  )
  const [endDate, setEndDate] = useState(new Date())
  console.log(report)
  useEffect(() => {
    dispatch(listReport(startDate, endDate))
  }, [dispatch, endDate, startDate])
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div>
          <h1 className='row center'>DASHBOARD</h1>
          <div className='row center'>
            <div className='cart cart-body'>
              <h2>Total Products: {report.productsReport.productNo}</h2>
            </div>
            <div className='cart cart-body'>
              <h2>Total Orders:{report.ordersReport.orderNo}</h2>
            </div>
            <div className='cart cart-body'>
              <h2>Total Users: {report.usersReport.userNo}</h2>
            </div>

            <div className='cart cart-body'>
              <h2>Total Payments : $ {report.ordersReport.totalPaid}</h2>
            </div>
            <div className='cart cart-body'>
              <h2>Total Items Sold: {report.ordersReport.totalItemsSold}</h2>
            </div>
          </div>
          <div className='row center'>
            <div className='cart cart-body'>
              <h2>Products to Deliver:{report.ordersReport.toDeliver} </h2>
            </div>
            <div className='cart cart-body'>
              <h2>Products Delivered: {report.ordersReport.delivered} </h2>
            </div>

            <div className='cart cart-body'>
              <h2>
                Pending Order Payment: {report.ordersReport.pendingPayment}
              </h2>
            </div>
            <div className='cart cart-body'>
              <h2>Paid Orders: {report.ordersReport.paidOrders}</h2>
            </div>
          </div>
          <h1 className='t-center'>Sales Report</h1>

          <div className='row center'>
            <p className='white-text'>Date: </p>
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className='date-picker'
              />
            </div>
            <p className='white-text'> - </p>
            <div>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                className='date-picker'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardScreen
