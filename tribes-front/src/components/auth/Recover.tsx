import React, {
  useState,
} from 'react'

import {
  useTranslation,
} from 'react-i18next'

import {
  Link,
} from 'react-router-dom'

import './Recover.scss'

/* RECOVER */

interface RecoverProps {
}

const Recover = (props: RecoverProps) => {

  const { t } = useTranslation()

  return (
    <div className='Recover'>
      <div>
        {t('auth.recover.title')}
      </div>
      <Link
        className=''
        to='/'
      >
        {t('auth.recover.link.back')}
      </Link>
    </div>
  )
}

export default Recover
