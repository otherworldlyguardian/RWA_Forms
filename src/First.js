import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Segment, Form, Button, Divider } from 'semantic-ui-react'
import { formUpdate } from './actions/formUpdate'
import { formChange } from './actions/formChange'
import { pageChange } from './actions/pageChange'

class First extends Component {
  constructor () {
    super()

    this.state = {
      pit: '',
      field: '',
      acres: '',
      sand: '',
      description: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      ...this.props.currentForm
    })
  }

  changeField = (e: SytheticEvent, data: object) => {
    var field = this.props.fieldsList[data.value - 1]
    this.setState(
      {
        notEmpty: true,
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
        this.props.formChange('second')
        break
      case 'Back':
        this.props.pageChange('home')
        break
      default:
        break
    }
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
      <Segment inverted>
        <Container>
          <Form inverted>
            <Form.Dropdown label='Pit' name='pit' placeholder='#' search selection value={this.state.pit} options={this.props.pitOptions} onChange={this.handleChange} required/>
            <Form.Dropdown label='Field' name='field' placeholder='#' value={this.state.field} search selection options={fieldsOptions} onChange={this.changeField} required/>
            <Form.Input label='Acres' name='acres' value={this.state.acres} placeholder='Number of acres' onChange={this.handleChange} required/>
            <Form.Dropdown label='Sand' name='sand' placeholder='Select' value={this.state.sand} search selection options={[{key: 'Y', value: 'Y', text: 'Yes'}, {key: 'N', value: 'N', text: 'No'}]} onChange={this.handleChange} required/>
            <Form.Input label="Field Description" name='description' value={this.state.description} onChange={this.handleChange} required/>
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
    fieldsList: state.fieldsList,
    pitOptions: state.pitOptions,
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

export default connect(mapStateToProps, matchDispatchToProps)(First)
