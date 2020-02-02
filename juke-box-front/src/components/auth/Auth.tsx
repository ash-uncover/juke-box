import React, { useState } from 'react'

import {
  Redirect,
  Switch,
  Route
} from 'react-router-dom'

import Login from './Login'
import Logout from './Logout'
import Recover from './Recover'

import './Auth.scss'

/* TRACKS */

interface AuthProps {
}

const Auth = (props: AuthProps) => {

  return (
    <div className='Auth'>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path='/recover'>
          <Recover />
        </Route>
        <Redirect from='/' to='/login' />
      </Switch>
    </div>
  )
}

export default Auth
