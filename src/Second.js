import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Segment, Form, Button, Divider } from 'semantic-ui-react'
import { formUpdate } from './actions/formUpdate'
import { formChange } from './actions/formChange'
import { pageChange } from './actions/pageChange'

class Second extends Component {
  constructor () {
    super()

    this.state = {
      gallons: '',
      application: '',
      method: '',
      soil: '',
      weather: '',
      temp: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      ...this.props.currentForm
    })
  }

  handleChange = (e: SytheticEvent, data: object) => {
    this.setState(
      {
        notEmpty: true,
        [data.name]: data.value
      }
    )
  }

  buttonClick = (e: SytheticEvent, data: object) => {
    this.props.formUpdate(this.state)
    switch (data.children) {
      case 'Home':
        this.props.pageChange('home')
        break
      case 'Next':
        this.props.formChange('third')
        break
      case 'Back':
        this.props.formChange('first')
        break
      default:
        break
    }
  }

  render () {
    return (
      <Segment inverted>
        <Container>
          <Form inverted>
            <Form.Input label='Gallons per Acres' name='gallons' value={this.state.gallons} placeholder='Number' onChange={this.handleChange} required/>
            Manure Application Details
            <Form.Dropdown name="application" placeholder='Field Application' search selection value={this.state.application} options={this.props.applicationOptions} onChange={this.handleChange} required/>
            <Form.Dropdown name='method' value={this.state.method} placeholder='Application Methods' search selection options={this.props.methodOptions} onChange={this.handleChange} required/>
            <Form.Dropdown name='soil' value={this.state.soil} placeholder='Soil Conditions' search selection options={this.props.soilOptions} onChange={this.handleChange} required/>
            <Form.Dropdown name='weather' value={this.state.weather} placeholder='Weather Application' search selection options={this.props.weatherOptions} onChange={this.handleChange} required/>
            <Form.Input label='Temperature' name='temp' value={this.state.temp} placeholder='Temperature in degrees' onChange={this.handleChange} required/>
          </Form>
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

function mapStateToProps(state) {
  return {
    applicationOptions: state.applicationOptions,
    methodOptions: state.methodOptions,
    soilOptions: state.soilOptions,
    weatherOptions: state.weatherOptions,
    currentForm: state.currentForm
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    formUpdate: formUpdate,
    pageChange: pageChange,
    formChange: formChange
  }, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(Second)
