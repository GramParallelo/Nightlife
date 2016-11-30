import { SAVE_SEARCH } from '../actions/types'
import isEmpty from 'lodash/isEmpty'

export default (state = {search: '', data: []}, action = {}) => {
  switch (action.type) {
    case SAVE_SEARCH:
      return {
        search: action.location,
        data: action.data
      }
    default: return state
  }
}
