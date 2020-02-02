import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authStateSelector, authErrorSelector } from '../../store/auth/selectors'

import RestService from '../../services/RestService'
import { Link } from 'react-router-dom'

import './Login.scss'

/* TRACKS */

interface LoginProps {
}

const Login = (props: LoginProps) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const authState = useSelector(authStateSelector)
  const authError = useSelector(authErrorSelector)

  const loginButtonEnabled = username && password && authState !== 'AUTH_CHECKING'

  return (
    <div className='Login'>
      <div className='Login-box'>

        <input
          className='Login-input Login-input-username'
          placeholder='username'
          type='text'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          className='Login-input Login-input-password'
          placeholder='password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          className='Login-button'
          type='button'
          disabled={!loginButtonEnabled}
          onClick={() => RestService.auth.get(dispatch, username, password)}
        >
          login
        </button>

        <Link
          className='Login-button-link'
          to='/recover'
        >
          lost password
        </Link>

        <Link
          className='Login-button-link'
          to='/register'
        >
          create account
        </Link>
      </div>

      { authState === 'AUTH_CHECKING' &&
        <div className='Login-loading'>
        </div>
      }
    </div>
  )
}

export default Login
