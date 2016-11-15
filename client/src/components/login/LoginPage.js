import React from 'react'
import LoginForm from './LoginForm'

export default class LoginPage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <LoginForm/>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {};
