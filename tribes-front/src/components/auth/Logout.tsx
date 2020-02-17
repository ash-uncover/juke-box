import React, {
  useEffect
} from 'react'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  useTranslation
} from 'react-i18next'

import {
  authTokenSelector,
  authStateSelector
} from '../../store/auth/selectors'

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

  const { t } = useTranslation()

  const authState = useSelector(authStateSelector)
  const isNone = authState === 'AUTH_NONE'

  useEffect(() => {
    if (!isNone) {
      RestService.auth.delete(dispatch)
    }
  })

  if (isNone) {
    return <Redirect to='/auth' />
  }
  return (
    <div className='Logout'>
      {t('auth.logout.message')}
    </div>
  )
}

export default Logout
