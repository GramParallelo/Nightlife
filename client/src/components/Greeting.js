import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getBars } from '../actions/searchActions'

class Greeting extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        bars: [],
        data: false
      }

      this.getBars = this.getBars.bind(this)
      this.going = this.going.bind(this)
    }
    getBars() {
      this.props.getBars('boston').then((res) => {
        console.log(res.data)
        this.setState({ bars: res.data[0].businesses, data: true })
      })
    }
    going() {
      
    }
    render () {
      const bars = this.state.data ? this.state.bars.map((bar) => {
        return (
          <li key={bar.id}><img role="presentation" width="100px" height="100px" src={bar.image_url} />
            {bar.name}
            <button onClick={this.going}>Going</button>
          </li>)}
      ) : 'Error'
      console.log(bars)
      return (
        <div className="jumbotron">
         <div className="container">
           <h1>Nightlife</h1>
           <h2>Nightlife</h2>
           <button onClick={this.getBars}>SEARCH</button>
           <ul>
           { bars }
           </ul>
         </div>
        </div>
    )
  }
}

Greeting.propTypes = {
  getBars: PropTypes.func.isRequired
}

export default connect(state => { return {} }, { getBars })(Greeting)
