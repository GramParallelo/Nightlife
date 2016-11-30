import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import Greeting from './components/Greeting'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'


//import requireAuth from './utils/requireAuth' // use this to have only user access page

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Greeting} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
  </Route>
)
