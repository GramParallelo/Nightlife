import axios from 'axios'
import { SAVE_SEARCH } from '../actions/types'


export function saveSearch(search){
  return {
    type: SAVE_SEARCH,
    location: search.location,
    data: search.data
  }
}

export function getBars(location) {
  return dispatch => {

    return axios.get(`/api/bars/search/${location}`).then(res => {
      dispatch(saveSearch({location, data: res.data[1]}))
      return res
    })
  }
}
