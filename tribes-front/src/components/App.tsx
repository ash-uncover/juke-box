import React, {
  Suspense,
  useEffect,
} from 'react'

import {
  useDispatch,
  useSelector,
} from 'react-redux'

import {
  authStateSelector,
} from '../store/auth/selectors'

import {
  socketStatusSelector,
} from '../store/socket/selectors'

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'

import Auth from './auth/Auth'
import Main from './main/Main'

import SocketService from '../services/SocketService'

import {
  AuthStatus,
  SocketStatus,
} from '../utils/constants'

import './App.scss'

interface AppProps {}

const App = (props: AppProps) => {
  const dispatch = useDispatch()

  const authState = useSelector(authStateSelector)
  const socketStatus = useSelector(socketStatusSelector)

  useEffect(() => {
    if (socketStatus === SocketStatus.NOT_CONNECTED) {
      SocketService.connect(dispatch, 'ws://localhost:3091/')
    }
  })

  switch (authState) {
    case AuthStatus.AUTHENTICATED: {
      switch (socketStatus) {
        case SocketStatus.NOT_CONNECTED: {
          return <div>Contacting server</div>
        }
        case SocketStatus.CONNECTING: {
          return <div>Contacting server</div>
        }
        case SocketStatus.CONNECTED: {
          return (
            <Suspense fallback='loading'>
              <Router>
                <Switch>
                  <Route path='/auth/logout'>
                    <Auth />
                  </Route>
                  <Route path='/auth'>
                    <Redirect to='/' />
                  </Route>
                  <Route path='*'>
                    <Main />
                  </Route>
                </Switch>
              </Router>
            </Suspense>
          )
        }
        case SocketStatus.CONNECTION_ERROR: {
          return <div>Server Connection error</div>
        }
        case SocketStatus.CONNECTION_LOST: {
          return <div>Connection lost</div>
        }
        default: {
          return <div>This should never happen</div>
        }
      }
    }
    default: {
      return (
        <Suspense fallback='loading'>
          <Router>
            <Switch>
              <Route path='/auth'>
                <Auth />
              </Route>
              <Route path='*'>
                <Redirect to='/auth' />
              </Route>
            </Switch>
          </Router>
        </Suspense>
      )
    }
  }
}

export default App
