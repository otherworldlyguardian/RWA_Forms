import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Timestamp from './timestamp'


class Input extends Component {
  constructor () {
    super()

    this.state = {

    }
  }

  changeField = (e: SytheticEvent, data: object) => {
    var field = this.props.fieldsList[data.value - 1]
    this.setState(
      {
        field: field.id,
        sand: field.sand,
        description: field.description
      }
    )
  }

  handleChange = (e: SytheticEvent, data: object) => {
    this.setState(
      {
        [data.name]: data.value
      }
    )
  }

  submission = () => {
    console.log(this.state)
  }

  render () {
    const fieldsOptions = this.props.fieldsList.map((field) => {
      return {
        key: field.id,
        value: field.id,
        text: field.label
      }
    })
    return (
      <Form inverted onSubmit={this.submission}>
        <Form.Input label="Date and Time" value={this.props.currentUser.logInStamp} />
        <Form.Input label="Initials" value={this.props.currentUser.initials} />
        <Form.Dropdown label='Field' name='field' placeholder='#' search selection options={fieldsOptions} onChange={this.changeField} />
        <Form.Dropdown label='Pit' name='pit' placeholder='#' search selection options={this.props.pitOptions} onChange={this.handleChange} />
        <Form.Dropdown label='Sand' name='sand' placeholder='Select' value={this.state.sand} search selection options={[{key: 'Y', value: 'Y', text: 'Yes'}, {key: 'N', value: 'N', text: 'No'}]} onChange={this.handleChange} />
        <Form.Input label="Field Description" name='description' value={this.state.description} onChange={this.handleChange} />
        Start Time
        <Timestamp />
        End Time
        <Timestamp />
        <Form.Input label='Field + Acres' placeholder='Field number and number of acres' />
        <Form.Input label='Gallons per Acres' placeholder='Number' />
        Manure Application Details
        <Form.Dropdown name="application" placeholder='Field Application' search selection value={this.state.application} options={this.props.applicationOptions} onChange={this.handleChange}/>
        <Form.Dropdown placeholder='Application Methods' search selection options={this.props.methodOptions} />
        <Form.Dropdown placeholder='Soil Conditions' search selection options={this.props.soilOptions} />
        <Form.Dropdown placeholder='Weather Application' search selection options={this.props.weatherOptions} />
        <Form.TextArea label='Notes' placeholder='Any additional notes or comments' />
        <Form.Button inverted type='submit'>Submit</Form.Button>
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    fieldsList: state.fieldsList,
    pitOptions: state.pitOptions,
    applicationOptions: state.applicationOptions,
    methodOptions: state.methodOptions,
    soilOptions: state.soilOptions,
    weatherOptions: state.weatherOptions
  }
}

export default connect(mapStateToProps)(Input)
