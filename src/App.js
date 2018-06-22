import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Segment, Menu } from 'semantic-ui-react'
import { fieldsUpdate } from './actions/fieldsUpdate'
import { logIn } from './actions/logIn'
import { setUser } from './actions/setUser'
import { logOut } from './actions/logOut'
import DriverMenu from './DriverMenu'
import LogIn from './LogIn'

class App extends Component {
  componentWillMount() {
    fetch('http://100.38.63.221:44400/fields')
    .then(resp => resp.json())
    .then(data => this.props.fieldsUpdate(data.fields))
    var signedIn = localStorage.getItem('rwa')
    if (signedIn) {
      fetch('http://100.38.63.221:44400/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': signedIn
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if (data.userId && data.firstName && data.lastName && data.initials) {
          this.props.logIn()
          this.props.setUser(data)
        }
      })
    }
  }

  handleLogOut = () => {
    localStorage.removeItem('rwa')
    this.props.logOut()
  }

  render () {
    if (this.props.loggedIn) {
      return (
        <Segment inverted raised>
          <Menu>
            <Menu.Item header>Welcome, {this.props.currentUser.firstName}</Menu.Item>
            <Menu.Item position='right' onClick={this.handleLogOut}>Log Out</Menu.Item>
          </Menu>
          <DriverMenu />
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
  return bindActionCreators({
    fieldsUpdate: fieldsUpdate,
    logOut: logOut,
    logIn: logIn,
    setUser: setUser
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
