import React, { useEffect } from 'react'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux'
import { listReport } from '../actions/reportActions'
import MessageBox from '../components/MessageBox'
function DashboardScreen() {
  const dispatch = useDispatch()
  const reportList = useSelector((state) => state.reportList)
  const { loading, error, report } = reportList
  console.log(report)
  useEffect(() => {
    dispatch(listReport({}))
  }, [dispatch])
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div>
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
          </div>
          <div className='row center'>
            <div className='cart cart-body'>
              <h2>Total Payments : $ {report.ordersReport.totalPaid}</h2>
            </div>
            <div className='cart cart-body'>
              <h2>Total Item Sold: </h2>
            </div>
          </div>
          <div className='row center'>
            <div className='cart cart-body'>
              <h2>Products to Deliver:{report.ordersReport.toDeliver} </h2>
            </div>
            <div className='cart cart-body'>
              <h2>Products Delivered: {report.ordersReport.delivered} </h2>
            </div>
          </div>
          <div className='row center'>
            <div className='cart cart-body'>
              <h2>
                Pending Order Payment: {report.ordersReport.pendingPayment}
              </h2>
            </div>
            <div className='cart cart-body'>
              <h2>Paid Orders: </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardScreen
