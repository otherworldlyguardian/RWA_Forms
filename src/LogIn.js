import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Segment} from 'semantic-ui-react'
import { logIn } from './actions/logIn'
import { setUser } from './actions/setUser'

class LogIn extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      password: ''
    }
  }
  handleChange = (e: SyntheticEvent, data: object) => {
    this.setState(
      {
        [data.name]: data.value
      }
    )
  }

  handleSubmit = (e: SyntheticEvent, data: object) => {
    fetch('http://100.38.63.221:44400/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(data => {
      if (!data.error) {
        this.props.logIn()
        this.props.setUser(data)
      } else {
        this.setState({
          password: ''
        })
      }
    })
  }

  render () {
    return (
      <Segment inverted>
        <Form inverted onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} required />
            <Form.Input name='password' type='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} required />
          </Form.Group>
          <Button type='submit'>Log In</Button>
        </Form>
      </Segment>
    )
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    logIn: logIn,
    setUser: setUser
  }, dispatch)
}

export default connect(null, matchDispatchToProps)(LogIn)
