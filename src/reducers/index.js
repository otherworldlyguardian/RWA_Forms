import { combineReducers } from 'redux'
import currentUser from './reducer-user'
import loggedIn from './reducer-log'
import fieldsReducer from './reducer-fields'
import pitReducer from './reducer-pit'
import applicationReducer from './reducer-application'
import methodReducer from './reducer-method'
import soilReducer from './reducer-soil'
import weatherReducer from './reducer-weather'

const allReducers = combineReducers({
  currentUser: currentUser,
  loggedIn: loggedIn,
  fieldsList: fieldsReducer,
  pitOptions: pitReducer,
  applicationOptions: applicationReducer,
  methodOptions: methodReducer,
  soilOptions: soilReducer,
  weatherOptions: weatherReducer
})

export default allReducers
