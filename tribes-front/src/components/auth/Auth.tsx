import React from 'react'

import {
  useSelector,
} from '../../utils/hooks'

import {
  authStateSelector,
} from '../../store/auth/authSelectors'

import {
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'

import Login from './Login'
import Logout from './Logout'
import Recover from './Recover'
import Register from './Register'

import './Auth.scss'

/* AUTH */

interface AuthProps {
}

const Auth = (props: AuthProps) => {
  const authState = useSelector(authStateSelector)
  const isLogout = authState === 'AUTH_DELETE'
  return (
    <div className='Auth'>
      <Switch>
        <Route path='/auth/login'>
          <Login />
        </Route>
        <Route path='/auth/logout'>
          <Logout />
        </Route>
        <Route path='/auth/recover'>
          <Recover />
        </Route>
        <Route path='/auth/register'>
          <Register />
        </Route>
        { isLogout ?
          <Redirect from='*' to='/auth/logout' />
        :
          <Redirect from='*' to='/auth/login' />
        }
      </Switch>
    </div>
  )
}

export default Auth
