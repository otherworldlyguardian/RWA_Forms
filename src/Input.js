import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Timestamp from './timestamp'
import { pageChange } from './actions/pageChange'
import { formChange } from './actions/formChange'


class Input extends Component {
  constructor () {
    super()

    this.state = {
      field: '',
      pit: '',
      sand: '',
      description: '',
      acres: '',
      gallons: '',
      application: '',
      method: '',
      soil: '',
      weather: '',
      temp: '',
      notes: ''
    }
  }

  changeField = (e: SytheticEvent, data: object) => {
    var field = this.props.fieldsList[data.value - 1]
    this.setState(
      {
        field: field.id,
        sand: field.sand ? "Y" : "N",
        description: field.description,
        acres: field.acreage
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

  changer = () => {
    this.props.pageChange('home')
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
      <Form inverted>
        <Form.Dropdown label='Pit' name='pit' placeholder='#' search selection options={this.props.pitOptions} onChange={this.handleChange} required/>
        <Form.Dropdown label='Field' name='field' placeholder='#' search selection options={fieldsOptions} onChange={this.changeField} required/>
        <Form.Input label='Acres' name='acres' value={this.state.acres} placeholder='Number of acres' onChange={this.handleChange} required/>
        <Form.Dropdown label='Sand' name='sand' placeholder='Select' value={this.state.sand} search selection options={[{key: 'Y', value: 'Y', text: 'Yes'}, {key: 'N', value: 'N', text: 'No'}]} onChange={this.handleChange} required/>
        <Form.Input label="Field Description" name='description' value={this.state.description} onChange={this.handleChange} required/>
        Start Time
        <Timestamp />
        End Time
        <Timestamp />
        <Form.Input label='Gallons per Acres' name='gallons' value={this.state.gallons} placeholder='Number' onChange={this.handleChange} required/>
        Manure Application Details
        <Form.Dropdown name="application" placeholder='Field Application' search selection value={this.state.application} options={this.props.applicationOptions} onChange={this.handleChange} required/>
        <Form.Dropdown name='method' value={this.state.method} placeholder='Application Methods' search selection options={this.props.methodOptions} onChange={this.handleChange} required/>
        <Form.Dropdown name='soil' value={this.state.soil} placeholder='Soil Conditions' search selection options={this.props.soilOptions} onChange={this.handleChange} required/>
        <Form.Dropdown name='weather' value={this.state.weather} placeholder='Weather Application' search selection options={this.props.weatherOptions} onChange={this.handleChange} required/>
        <Form.Input label='Temperature' name='temp' value={this.state.temp} placeholder='Temperature in degrees' onChange={this.handleChange} required/>
        <Form.TextArea label='Notes' name='notes' value={this.state.notes} placeholder='Any additional notes or comments' onChange={this.handleChange} />
        <Button inverted onClick={this.changer}>Back</Button>
        <Button inverted onClick={this.submission}>Submit</Button>
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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    pageChange: pageChange,
    formChange: formChange
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Input)
