import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {getBars} from '../actions/searchActions'
import {going} from '../actions/userActions'

import TextFieldGroup from './common/TextFieldGroup'

import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

function validateInput(search) {
    let errors = {}

    if (Validator.isEmpty(search)) {
        errors.search = 'This field is required'
    }
    return {errors, isValid: isEmpty(errors)}
}

// TODO: EXTRACT COMPONENT FROM THIS

class Greeting extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bars: [],
            data: false,
            search: '',
            errors: {},
            isLoading: false

        }

        this.getBars = this.getBars.bind(this)
        this.going = this.going.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isValid = this.isValid.bind(this)
    }
    componentDidMount() {
      if(this.props.search.search !== '') {
        this.setState({bars: this.props.search.data, data: true, isLoading: false})
        // this.props.getBars(this.props.search.search).then((res) => {
        //     console.log(res.data, this.props.search.search);
        //     this.setState({bars: res.data[1], data: true, isLoading: false})
        // })
      }
    }
    handleChange(e) {
        e.preventDefault()
        this.setState({search: e.target.value})
    }
    isValid() {
        const {errors, isValid} = validateInput(this.state.search)

        if (!isValid) {
            this.setState({errors: errors})
        }

        return isValid
    }
    getBars(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true}) // , isLoading: true
            this.props.getBars(this.state.search).then((res) => {
                this.setState({bars: res.data[1], data: true, isLoading: false})
            })
        }
    }
    going(data) {
        // is there a better way to do this?
        let attending = this.state.bars.filter((bar) => {
              return bar.barId === data.barId
        })[0].attendees.indexOf(data.user)

        // computed property
        data['attending'] = attending

        this.props.going(data).then((res) => {
            console.log("going", res)
            let bars = this.state.bars
            bars = bars.map((bar) => {
                if (bar.barId === res.data.barId) {
                    bar.attendees = res.data.attendees
                }
                return bar
            })
            this.setState(bars)
        })
    }
    render() {
        let {isAuthenticated, user} = this.props.auth
        const bars = this.state.data
            ? this.state.bars.map((bar) => {
                let goingButton = isAuthenticated
                    ? [(
                            <span key={bar.id + 1} className="badge btn btn-sm btn-success" onClick={() => this.going({location: bar.location, barId: bar.barId, user: user.username})}>
                                <span key={bar.id + 2} style={{
                                    'marginRight': '5px'
                                }}>{bar.attendees.length || 0}</span>Going</span>
                        )]
                    : [(
                            <div key={'logintoseewhosegoing'} id="loginmessage">Login to see whose going!!</div>
                        )]
                return (

                    <li className="media" key={bar.barId}>
                          <div className="media-left">
                              <img className="thumbnail" role="presentation" width="200px" height="200px" src={bar.img_url}/>
                          </div>
                          <div className="media-body">
                              <h3 className="" style={{
                                  borderBottom: '3px solid black'
                              }}>
                                  <a className="" href={bar.url}>{bar.name}
                                  </a>
                              </h3>
                              {goingButton}
                        </div>


                    </li>
                )
            })
            : ''
        return (
            <div className="jumbotron">
                <div className="container">
                    <h1>Scope out da Nightlife</h1>
                    <p>Want to follow the herd or </p>
                    <p>have a romantic date? </p>

                    <form action="" onSubmit={this.getBars} className="col-md-4">

                        <TextFieldGroup placeholder="Enter City" error={this.state.errors.search} label="Search" onChange={this.handleChange} value={this.state.search} field="search"/>
                        <div className="form-group">
                            <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                                Search
                            </button>
                        </div>
                    </form>
                    <ul className="media-list col-md-6">
                        {bars}
                    </ul>
                </div>
            </div>
        )
    }
}

Greeting.propTypes = {
    auth: PropTypes.object.isRequired,
    getBars: PropTypes.func.isRequired,
    going: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
      auth: state.auth,
      search: state.search

    }
}

export default connect(mapStateToProps, {getBars, going})(Greeting)
