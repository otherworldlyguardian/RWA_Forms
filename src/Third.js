import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Segment, Container, Button, Divider } from 'semantic-ui-react'
import Timestamp from './timestamp'
import { formUpdate } from './actions/formUpdate'
import { formChange } from './actions/formChange'
import { pageChange } from './actions/pageChange'

class Third extends Component {
  constructor () {
    super()

    this.state = {
      start: '',
      end: ''
    }
  }

  buttonClick = (e: SytheticEvent, data: object) => {
    this.props.formUpdate(this.state)
    switch (data.children) {
      case 'Home':
        this.props.pageChange('home')
        break
      case 'Next':
        this.props.formChange('last')
        break
      case 'Back':
        this.props.formChange('second')
        break
      default:
        break
    }
  }

  clickStart = () => {
    this.setState({
      start: Date().split(' G')[0]
    })
  }

  clickEnd = () => {
    this.setState({
      end: Date().split(' G')[0]
    })
  }

  render () {
    return (
      <Segment inverted>
        <Container>
          Start Time
          <p>{this.state.start}<Button inverted onClick={this.clickStart}>New Timestamp</Button></p>
          End Time
          <p>{this.state.end}<Button inverted onClick={this.clickEnd}>New Timestamp</Button></p>
        </Container>
        <Divider hidden />
        <Button floated='left' onClick={this.buttonClick}>Home</Button>
        <Button floated='right' onClick={this.buttonClick}>Next</Button>
        <Button floated='right' onClick={this.buttonClick}>Back</Button>
        <Divider hidden />
      </Segment>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    formUpdate: formUpdate,
    pageChange: pageChange,
    formChange: formChange
  }, dispatch)
}

export default connect(null, matchDispatchToProps)(Third)
