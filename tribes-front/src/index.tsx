import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'
import * as serviceWorker from './serviceWorker'

import './i18n'

import './index.scss'

// LOGS
// Sets up the global log level for the server
// -----------------------
import { LogConfig } from 'ap-utils-logger'
LogConfig.debug()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
