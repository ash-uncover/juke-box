import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore , compose } from 'redux'
import reducer from './store/reducer'

import App from './components/App'
import * as serviceWorker from './serviceWorker'

import './index.scss'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? : typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
