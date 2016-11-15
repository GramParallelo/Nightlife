import React from 'react';
import SignupForm from './SignupForm'
import {connect} from 'react-redux'
import {userSignupRequest, isUserExists} from '../../actions/signupActions'
import {addFlashMessage} from '../../actions/flashMessages'

class SignupPage extends React.Component {
    render() {
        const {userSignupRequest, addFlashMessage, isUserExists} = this.props
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-md-4 col-md-offset-4">
                        <SignupForm isUserExists={isUserExists} userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
                    </div>

                </div>
            </div>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired
}

export default connect((state) => {
    return {}
}, {userSignupRequest, addFlashMessage, isUserExists})(SignupPage)
