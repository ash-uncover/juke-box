import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { authStateSelector } from '../store/auth/selectors'

import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom'

import Auth from './auth/Auth'
import Main from './main/Main'

import './App.scss'

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
          <Main />
        </Route>
      </Switch>
    </Router>
  </Suspense>
)

interface AppProps {}

const App = (props: AppProps) => {
  const authState = useSelector(authStateSelector)

  const isLogged = authState === 'AUTH_OK'

  if (!isLogged) {
    return renderNoAuth()
  }

  return renderAuth()
}

export default App
