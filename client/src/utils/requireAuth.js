import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { addFlashMessage } from '../actions/flashMessages'


export default function(ComposedComponent) {

  class Authenticate extends React.Component {

    componentWillMount() {
      if(!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        })
        this.context.router.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/')
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }
  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate)
}
