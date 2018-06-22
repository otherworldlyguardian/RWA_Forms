import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import First from './First'
import Second from './Second'
import Third from './Third'
import Last from './Last'
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

  changer = () => {
    this.props.pageChange('home')
  }

  render () {
    switch (this.props.formState) {
      case 'first':
        return (
          <First />
        )
      case 'second':
        return (
          <Second />
        )
      case 'third':
        return (
          <Third />
        )
      case 'last':
        return (
          <Last />
        )
      default:
        break
    }
    // return (
    //   <Form inverted>
    //     <Button inverted onClick={this.changer}>Back</Button>
    //     <Button inverted onClick={this.submission}>Submit</Button>
    //   </Form>
    // )
  }
}

function mapStateToProps(state) {
  return {
    formState: state.formState,
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
