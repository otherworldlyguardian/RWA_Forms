import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class Timestamp extends Component {
  constructor () {
    super()

    this.state = {
      click: false,
      ts: ''
    }
  }

  clickTimestamp = () => {
    this.setState({
      click: true,
      ts: Date().split(' G')[0]
    })
  }

  render () {
    if (this.state.click) {
      return (
        <p>{this.state.ts}<Button inverted onClick={this.clickTimestamp}>New Timestamp</Button></p>
      )
    }
    return (
      <p>
        <Button inverted onClick={this.clickTimestamp}>New Timestamp</Button>
      </p>
    )
  }
}

export default Timestamp
