import axios from 'axios'

export function going(data) {
  return dispatch => {
    return axios.post('/api/bars/going', data)
  }
}

export function notgoing(bar) {
  return dispatch => {
    return axios.post('/api/bars/notgoing', bar)
  }
}
