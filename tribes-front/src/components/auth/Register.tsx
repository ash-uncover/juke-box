import React from 'react'

import {
  useTranslation
} from 'react-i18next'

import { Link } from 'react-router-dom'

import './Recover.scss'

/* REGISTER */

interface RegisterProps {
}

const Register = (props: RegisterProps) => {

  const { t } = useTranslation()

  return (
    <div className='Register'>
      <div>
      {t('auth.register.title')}
      </div>
      <Link
        className=''
        to='/'
      >
        {t('auth.register.link.back')}
      </Link>
    </div>
  )
}

export default Register
