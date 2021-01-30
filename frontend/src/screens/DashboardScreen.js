import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import CanvasJSReact from '../assets/canvasjs.react'
import 'react-datepicker/dist/react-datepicker.css'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux'
import { listReport } from '../actions/reportActions'
import MessageBox from '../components/MessageBox'
function DashboardScreen() {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart
  const dispatch = useDispatch()
  const reportList = useSelector((state) => state.reportList)
  const { loading, error, report } = reportList
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  )

  const options = loading
    ? null
    : {
        theme: 'dark1',
        animationEnabled: true,
        title: {
          text: 'Sales 7 Days',
        },
        axisX: {
          valueFormatString: 'MMM-DD',
        },
        axisY: {
          title: 'Sales (in USD)',
          prefix: '$',
        },
        data: [
          {
            yValueFormatString: '$#,###',
            xValueFormatString: 'MMMM DD, YYYY',
            type: 'spline',
            dataPoints: [
              {
                x: new Date(report.dateReport.salesReport.day1Sales.date),
                y: parseInt(report.dateReport.salesReport.day1Sales.day1Sales),
              },
              {
                x: new Date(report.dateReport.salesReport.day2Sales.date),
                y: parseInt(report.dateReport.salesReport.day2Sales.day2Sales),
              },
              {
                x: new Date(report.dateReport.salesReport.day3Sales.date),
                y: parseInt(report.dateReport.salesReport.day3Sales.day3Sales),
              },
              {
                x: new Date(report.dateReport.salesReport.day4Sales.date),
                y: parseInt(report.dateReport.salesReport.day4Sales.day4Sales),
              },
              {
                x: new Date(report.dateReport.salesReport.day5Sales.date),
                y: parseInt(report.dateReport.salesReport.day5Sales.day5Sales),
              },
              {
                x: new Date(report.dateReport.salesReport.day6Sales.date),
                y: parseInt(report.dateReport.salesReport.day6Sales.day6Sales),
              },
              {
                x: new Date(report.dateReport.salesReport.day7Sales.date),
                y: parseInt(report.dateReport.salesReport.day7Sales.day7Sales),
              },
            ],
          },
        ],
      }

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
        <div className='row top'>
          <div className=' cart cart-body'>
            {' '}
            <h1 className='row center'>DASHBOARD</h1>
            <div className=''>
              <div className=''>
                <p className='white-text'>
                  Total Products:{' '}
                  <span className='bold'>
                    {report.productsReport.productNo}
                  </span>
                </p>
              </div>
              <div className=''>
                <p className='white-text'>
                  Total Orders:
                  <span className='bold'>{report.ordersReport.orderNo}</span>
                </p>
              </div>
              <div className=''>
                <p className='white-text'>
                  Total Users:{' '}
                  <span className='bold'>{report.usersReport.userNo}</span>
                </p>
              </div>

              <div className=''>
                <p className='white-text'>
                  Total Payments :{' '}
                  <span className='bold'>
                    $ {report.ordersReport.totalPaid}
                  </span>
                </p>
              </div>
              <div className=''>
                <p className='white-text'>
                  Total Items Sold:{' '}
                  <span className='bold'>
                    {report.ordersReport.totalItemsSold}
                  </span>
                </p>
              </div>

              <div className=''>
                <p className='white-text'>
                  Products to Deliver:
                  <span className='bold'>
                    {report.ordersReport.toDeliver}
                  </span>{' '}
                </p>
              </div>
              <div className=''>
                <p className='white-text'>
                  Products Delivered:{' '}
                  <span className='bold'>{report.ordersReport.delivered}</span>{' '}
                </p>
              </div>

              <div className=''>
                <p className='white-text'>
                  Pending Order Payment:{' '}
                  <span className='bold'>
                    {report.ordersReport.pendingPayment}
                  </span>
                </p>
              </div>
              <div className=''>
                <p className='white-text'>
                  Paid Orders:{' '}
                  <span className='bold'>{report.ordersReport.paidOrders}</span>
                </p>
              </div>
            </div>
          </div>
          <div className='col-2 cart cart-body'>
            <h1 className='t-center'>Reports</h1>

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
            <div className='row center'>
              <div className='report-item'>
                <h3 className='white-text'>
                  Sales
                  <p className='bolder'>$ {report.dateReport.newPayment}</p>
                </h3>
              </div>
              <div className='report-item'>
                <h3 className='white-text'>
                  New Products
                  <p className='bolder'>
                    {report.dateReport.newProducts.length}
                  </p>
                </h3>
              </div>
              <div className='report-item'>
                <h3 className='white-text'>
                  New Orders
                  <p className='bolder'>{report.dateReport.newOrders.length}</p>
                </h3>
              </div>
              <div className='report-item'>
                <h3 className='white-text'>
                  New Users
                  <p className='bolder'>{report.dateReport.newUsers.length}</p>
                </h3>
              </div>
            </div>
            <CanvasJSChart
              options={options}
              /* onRef={ref => this.chart = ref} */
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardScreen
