import React, {PropTypes} from 'react'
import timezones from '../../data/timezones'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'
//import {browserHistory} from 'react-router'

//import validateInput from '../../../server/shared/validations/signup'
import TextFieldGroup from '../common/TextFieldGroup'

import Validator from 'validator'

function validateInput(data) {
  let errors = {}

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required'
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required'
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Email Passwords must match'
  }
  if (Validator.isEmpty(data.timezone)) {
    errors.timezone = 'This field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.checkUserExists = this.checkUserExists.bind(this)
  }
  onChange(e) {
    this.setState( {[e.target.name]: e.target.value})
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors: errors })
    }

    return isValid
  }
  checkUserExists(e) {
    const field = e.target.name
    const val = e.target.value
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors
        let invalid
        if (!isEmpty(res.data.user)) {
          errors[field] = 'Choose another ' + field.toUpperCase()
          invalid = true
        } else {
          errors[field] = ''
          invalid = false
        }
        this.setState({ errors, invalid })
      })
    }
  }
  onSubmit(e) {
    e.preventDefault()
    if(this.isValid()){
      this.setState({ errors: {}, isLoading: true })
      this.props.userSignupRequest(this.state).then(
        () => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'You signed up successfully. Welcome'
        })
        this.context.router.push('/')
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false})
      )  //axios.post('/api/users', { user: this.state })
    }
  }

  render() {
    const { errors } = this.state
    const options = Object.keys(timezones).map(function(val){
      return (
        <option key={timezones[val]} value={timezones[val]}>{val}</option>
      )
    })﻿
    return (
      <form action="" onSubmit={this.onSubmit}>
        <h1>Join our community</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />
        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          field="email"
        />
        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
        />
        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
        />
        <div className={classnames("form-group", { 'has-error': errors.timezone})}>
          <label htmlFor="" className="control-label">Timezone</label>
          <select
            value={this.state.timezone}
            onChange={this.onChange}
            type="text"
            name="timezone"
            className="form-control"
          >
            <option value="" disabled>Choose Your Timezone</option>
            {options}
        </select>
        {errors.username && <span className="help-block">{errors.timezone}</span>}
        </div>
        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Sign Up
          </button>
        </div>

      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}


export default SignupForm
