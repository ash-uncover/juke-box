import React, { Suspense } from 'react'
import { useSelector } from "react-redux"
import { authStateSelector } from '../store/auth/selectors'

import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import Auth from './auth/Auth'

import './App.scss'

interface AppProps {}

const renderNoAuth = () => (
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

const renderAuth = () => (
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
          <div className='App'>
            <Link
              className='Login-button-link'
              to='/auth/logout'
            >
              <FontAwesomeIcon
                icon={faPowerOff}
                color='red'
                size='2x'
              />
            </Link>
          </div>
        </Route>
      </Switch>
    </Router>
  </Suspense>
)

const App = (props: AppProps) => {
  const authState = useSelector(authStateSelector)

  const isLogged = authState === 'AUTH_OK'

  if (!isLogged) {
    return renderNoAuth()
  }

  return renderAuth()
}

export default App
