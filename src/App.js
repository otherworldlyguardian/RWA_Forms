import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Segment, Menu } from 'semantic-ui-react'
import { fieldsUpdate } from './actions/fieldsUpdate'
import DriverMenu from './DriverMenu'
import LogIn from './LogIn'

class App extends Component {
  // componentWillMount() {
  //   fetch('http://100.38.63.221:44400/fields')
  //   .then(resp => resp.json())
  //   .then(data => this.props.fieldsUpdate(data.fields))
  // }

  render () {
    if (this.props.loggedIn) {
      return (
        <Segment inverted raised>
          <Menu>
            <Menu.Item header>Welcome, {this.props.currentUser.firstName}</Menu.Item>
            <Menu.Item position='right'>Log Out</Menu.Item>
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
    fieldsUpdate: fieldsUpdate
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
