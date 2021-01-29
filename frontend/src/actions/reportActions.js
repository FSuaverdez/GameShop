import {
  REPORT_LIST_FAIL,
  REPORT_LIST_REQUEST,
  REPORT_LIST_SUCCESS,
} from '../constants/reportConstants'

import Axios from 'axios'

export const listReport = (startDate, endDate) => async (dispatch) => {
  console.log(startDate, endDate)
  dispatch({
    type: REPORT_LIST_REQUEST,
  })
  try {
    const { data } = await Axios.get(`/api/reports`, {
      params: {
        startDate,
        endDate,
      },
    })
    dispatch({ type: REPORT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: REPORT_LIST_FAIL, payload: error.message })
  }
}
