import React from 'react'

import {
  useDispatcher,
  useEffect,
  useSelector,
  useTranslation,
} from '../../utils/hooks'

import {
  authTokenSelector,
  authStateSelector,
} from '../../store/auth/authSelectors'

import {
  Redirect,
} from 'react-router-dom'

import RestService from '../../services/RestService'

import {
  AuthStatus,
} from '../../utils/constants'

import './Logout.scss'

/* TRACKS */

interface LogoutProps {
}

const isDisconnected = (authState: AuthStatus) => {
  return authState === AuthStatus.NONE || authState === AuthStatus.DISCONNECTED
}

const shouldDisconnected = (authState: AuthStatus) => {
  return !isDisconnected(authState) && !(authState === AuthStatus.DISCONNECTING)
}

const Logout = (props: LogoutProps) => {
  const dispatch = useDispatcher()

  const { t } = useTranslation()

  const authState = useSelector(authStateSelector)

  useEffect(() => {
    if (shouldDisconnected(authState)) {
      RestService.auth.delete(dispatch)
    }
  })

  if (isDisconnected(authState)) {
    return <Redirect to='/auth' />
  }
  return (
    <div className='Logout'>
      {t('auth.logout.message')}
    </div>
  )
}

export default Logout
