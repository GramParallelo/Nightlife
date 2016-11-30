import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken'
//import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'
import { SET_CURRENT_USER } from './types.js'

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth/', data).then(res => {
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
      dispatch(setCurrentUser(jwtDecode(token)))
    })
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    console.log(window.gapi);
    window.gapi.auth2.getAuthInstance().signOut().then(function () {
      console.log('User signed out.');
    })
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}
