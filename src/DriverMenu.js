import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fieldsUpdate } from './actions/fieldsUpdate'
import { Segment, Button, Divider } from 'semantic-ui-react'
import Input from './Input'
import { pageChange } from './actions/pageChange'

class DriverMenu extends Component {
  changer = () => {
    this.props.pageChange('form')
  }

  resync = () => {
    // fetch('http://100.38.63.221:44400/fields')
    // .then(resp => resp.json())
    // .then(data => {
    //   this.props.fieldsUpdate(data.fields)
    //   window.alert('The fields list has been successfully resynced.')
    // })
  }

  render () {
    switch (this.props.pageState) {
      case 'home':
        return (
          <Segment inverted>
            <Button onClick={this.changer}>New Form</Button>
            <Divider hidden/>
            <Button onClick={this.resync}>Resync Fields</Button>
          </Segment>
        )
      case 'form':
        return (
          <Input />
        )
      default:
        break
    }
  }
}

function mapStateToProps(state) {
  return {
    pageState: state.pageState
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    pageChange: pageChange,
    fieldsUpdate: fieldsUpdate
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DriverMenu)
