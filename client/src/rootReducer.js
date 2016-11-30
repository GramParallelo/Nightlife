import  { combineReducers } from 'redux'

import flashMessages  from './reducers/flashMessages'
import auth from './reducers/auth'
import search from './reducers/search'

const rootReducer = combineReducers({
  flashMessages,
  auth,
  search
})

export default rootReducer
