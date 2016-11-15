import axios from 'axios'

export function getBars(location) {
  return dispatch => {
    return axios.get(`/api/bars/search/${location}`)
  }
}
