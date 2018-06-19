import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Segment, Header } from 'semantic-ui-react'
import { fieldsUpdate } from './actions/fieldsUpdate'
import Input from './Input.js'
import LogIn from './LogIn.js'

class App extends Component {
  componentWillMount() {
    fetch('http://192.168.1.170:3000/fields')
    .then(resp => resp.json())
    .then(data => this.props.fieldsUpdate(data.fields))
  }

  render () {
    if (this.props.loggedIn) {
      return (
        <Segment inverted raised>
          <Header as='h2'>Welcome, {this.props.currentUser.firstName}</Header>
          <Input />
        </Segment>
      )
    } else {
      return (
        <LogIn />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    currentUser: state.currentUser
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({fieldsUpdate: fieldsUpdate}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
