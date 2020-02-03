import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authTokenSelector, authStateSelector } from '../../store/auth/selectors'

import {
  Redirect
} from 'react-router-dom'

import RestService from '../../services/RestService'

import './Logout.scss'

/* TRACKS */

interface LogoutProps {
}

const Logout = (props: LogoutProps) => {
  const dispatch = useDispatch()
  const authToken = useSelector(authTokenSelector)

  const authState = useSelector(authStateSelector)
  const isNone = authState === 'AUTH_NONE'

  useEffect(() => {
    if (!isNone) {
      RestService.auth.delete(dispatch, authToken)
    }
  })

  if (isNone) {
    return <Redirect to='/auth' />
  }
  return (
    <div className='Logout'>
      Logout...
    </div>
  )
}

export default Logout
