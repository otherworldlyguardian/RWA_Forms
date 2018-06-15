import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import allReducers from './reducers'
import App from './App'

const store = createStore(allReducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
