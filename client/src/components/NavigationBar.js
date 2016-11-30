import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {logout} from '../actions/authActions'

class NavigationBar extends React.Component {
    logout(e) {
        e.preventDefault()
        this.props.logout()
    }
    render() {
        const {isAuthenticated} = this.props.auth
        const active = {
            borderBottom: '3px solid #04beca'
        }

        const userLinks = (
            <div>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                    </li>
                </ul>
            </div>
        )

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="signup" activeStyle={active}>Sign Up</Link>
                </li>
                <li>
                    <Link to="login" activeStyle={active}>Login</Link>
                </li>
            </ul>
        )

        return (
            <div className="navbar navbar-default navbar-static-top">
                <div className="container-fluid">
                    {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        
                        <Link className="navbar-brand" to="/" activeStyle={active} onlyActiveOnIndex={true}>
                            <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                            <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>

                              WHOSE GOING OUT TAH-NIGHT !!
                            <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                            <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
                        </Link>
                    </div>

                    {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        {isAuthenticated
                            ? userLinks
                            : guestLinks}
                    </div>
                    {/* <!-- /.navbar-collapse --> */}
                </div>
                {/* <!-- /.container-fluid --> */}
            </div>
        )
    }
}

NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired

}

function mapStateToProps(state) {
    return {auth: state.auth}
}

export default connect(mapStateToProps, {logout})(NavigationBar)
