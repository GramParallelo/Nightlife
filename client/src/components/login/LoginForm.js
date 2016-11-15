import React, {PropTypes} from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
//import validateInput from '../../../server/shared/validations/login'
import {connect} from 'react-redux'
import {login} from '../../actions/authActions'

import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

function validateInput(data) {
    let errors = {}

    if (Validator.isEmpty(data.identifier)) {
        errors.identifier = 'This field is required!'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required!'
    }

    return {errors, isValid: isEmpty(errors)}
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.signup = this.signup.bind(this)
    }
    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.login(this.state).then((res) => this.context.router.push('/')).catch((err) => this.setState({errors: err.response.data.errors, isLoading: false}))
        }
    }
    isValid() {
        const {errors, isValid} = validateInput(this.state)

        if (!isValid) {
            this.setState({errors})
        }

        return isValid
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    signup(e){
      e.preventDefault()
      this.context.router.push('/signup')
    }
    render() {
        const {errors, identifier, password, isLoading} = this.state
        return (
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
                    <form onSubmit={this.onSubmit}>
                        <h1>Login</h1>

                        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                        <TextFieldGroup field="identifier" label="Username / Email" value={identifier} error={errors.identifier} onChange={this.onChange}/>
                        <TextFieldGroup field="password" label="Password" value={password} error={errors.password} onChange={this.onChange} type="password"/>

                        <div className="form-group">
                            <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
                        </div>
                    </form>
                    <label> Not a user?! ==> </label>
                    <button className="" onClick={this.signup}>Signup</button>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, {login})(LoginForm)
