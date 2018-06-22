import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Segment, Button, Divider } from 'semantic-ui-react'
import Input from './Input'
import { formChange } from './actions/formChange'
import { pageChange } from './actions/pageChange'
import { fieldsUpdate } from './actions/fieldsUpdate'
import { formClear } from "./actions/formClear"

class DriverMenu extends Component {
  changer = (e: SyntheticEvent, data: object) => {
    if (data.children === 'New Form') {
      this.props.formChange('first')
      this.props.formClear()
    }
    this.props.pageChange('form')
  }

  resync = () => {
    fetch('http://100.38.63.221:44400/fields')
    .then(resp => resp.json())
    .then(data => {
      this.props.fieldsUpdate(data.fields)
      window.alert('The fields list has been successfully resynced.')
    })
  }

  render () {
    switch (this.props.pageState) {
      case 'home':
        if (this.props.currentForm.notEmpty) {
          return (
            <Segment inverted>
              <Button onClick={this.changer}>New Form</Button>
              <Button onClick={this.changer}>Continue</Button>
              <Divider hidden/>
              <Button onClick={this.resync}>Resync Fields</Button>
            </Segment>
          )
        }
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
    pageState: state.pageState,
    currentForm: state.currentForm
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    formChange: formChange,
    pageChange: pageChange,
    fieldsUpdate: fieldsUpdate,
    formClear: formClear
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DriverMenu)
