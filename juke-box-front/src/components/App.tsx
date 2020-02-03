import React, { Suspense } from 'react'
import { useSelector } from "react-redux"
import { authStateSelector } from '../store/auth/selectors'
import { dataTracksSelector } from '../store/data/selectors'

import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Auth from './auth/Auth'
import Tracks from './tracks/Tracks'

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

const renderAuth = (tracks: any) => (
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
              logout
            </Link>
            <Tracks tracks={tracks} />
          </div>
        </Route>
      </Switch>
    </Router>
  </Suspense>
)

const App = (props: AppProps) => {
  const tracks = useSelector(dataTracksSelector)
  const authState = useSelector(authStateSelector)

  const isLogged = authState === 'AUTH_OK'

  if (!isLogged) {
    return renderNoAuth()
  }

  return renderAuth(tracks)
}

export default App
