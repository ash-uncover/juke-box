import React, { Suspense } from 'react'
import { useSelector } from "react-redux"
import { authStateSelector } from '../store/auth/selectors'
import { dataTracksSelector } from '../store/data/selectors'

import {
  HashRouter as Router
} from 'react-router-dom'

import Auth from './auth/Auth'
import Tracks from './tracks/Tracks'

import './App.scss'

interface AppProps {}

const App = (props: AppProps) => {
  const tracks = useSelector(dataTracksSelector)
  const authState = useSelector(authStateSelector)

  if (authState !== 'AUTH_OK') {
    return (
      <Suspense fallback='loading'>
        <Router>
          <Auth />
        </Router>
      </Suspense>
    )
  }

  return (
    <Suspense fallback='loading'>
      <Router>
        <div className='App'>
          <Tracks tracks={tracks} />
        </div>
      </Router>
    </Suspense>
  )
}

export default App
