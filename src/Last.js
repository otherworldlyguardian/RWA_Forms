import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Segment, Container, Form, Button, Divider } from 'semantic-ui-react'
import { formUpdate } from './actions/formUpdate'
import { formChange } from './actions/formChange'
import { pageChange } from './actions/pageChange'
import { formClear } from './actions/formClear'

class Last extends Component {
  constructor () {
    super()

    this.state = {
      notes: ''
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

  complete = () => {
    return this.props.currentForm.pit && this.props.currentForm.field && this.props.currentForm.acres && this.props.currentForm.sand && this.props.currentForm.description && this.props.currentForm.gallons && this.props.currentForm.application && this.props.currentForm.method && this.props.currentForm.soil && this.props.currentForm.weather && this.props.currentForm.temp && this.props.currentForm.start && this.props.currentForm.end
  }

  submitForm = () => {
    fetch('http://100.38.63.221:44400/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('rwa')
      },
      body: JSON.stringify(this.props.currentForm)
    })
    .then(resp => {
      this.props.pageChange('home')
      this.props.formClear()
      window.alert('Form successfully submitted')
    })
    .catch((err) => window.alert('Service unavailable. Please try again in a few minutes'))
  }

  buttonClick = (e: SytheticEvent, data: object) => {
    this.props.formUpdate(this.state)
    switch (data.children) {
      case 'Home':
        this.props.pageChange('home')
        break
      case 'Submit':
        if (this.complete()) {
          this.submitForm()
        } else {
          window.alert('Some information is missing. Please go back and fill out all required information.')
        }
        break
      case 'Back':
        this.props.formChange('third')
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
            <Form.TextArea label='Notes' name='notes' value={this.state.notes} placeholder='Any additional notes or comments? (Optional)' onChange={this.handleChange} />
          </Form>
        </Container>
        <Divider hidden />
        <Button floated='left' onClick={this.buttonClick}>Home</Button>
        <Button floated='right' onClick={this.buttonClick}>Submit</Button>
        <Button floated='right' onClick={this.buttonClick}>Back</Button>
        <Divider hidden />
      </Segment>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentForm: state.currentForm
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    formUpdate: formUpdate,
    pageChange: pageChange,
    formChange: formChange,
    formClear: formClear
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Last)
