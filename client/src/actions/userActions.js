import axios from 'axios'

export function going(bar) {
  return dispatch => {
    return axios.post('/api/bars/going', bar)
  }
}

export function going(bar) {
  return dispatch => {
    return axios.post('/api/bars/notgoing', bar)
  }
}
