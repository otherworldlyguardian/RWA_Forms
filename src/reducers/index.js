import { combineReducers } from 'redux'
import userReducer from './reducer-user'
import logReducer from './reducer-log'
import fieldsReducer from './reducer-fields'
import pitReducer from './reducer-pit'
import applicationReducer from './reducer-application'
import methodReducer from './reducer-method'
import soilReducer from './reducer-soil'
import weatherReducer from './reducer-weather'
import pageReducer from './reducer-page'
import formReducer from './reducer-form'

const allReducers = combineReducers({
  currentUser: userReducer,
  loggedIn: logReducer,
  fieldsList: fieldsReducer,
  pitOptions: pitReducer,
  applicationOptions: applicationReducer,
  methodOptions: methodReducer,
  soilOptions: soilReducer,
  weatherOptions: weatherReducer,
  pageState: pageReducer,
  formState: formReducer
})

export default allReducers
