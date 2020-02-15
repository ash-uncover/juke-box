import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import './AppToolbar.scss'

/* AppToolbar */

interface AppToolbarProps {
}

const AppToolbar = (props: AppToolbarProps) => {
  return (
    <div className='AppToolbar'>
      <Link
        className='AppToolbar-button-link'
        to='/auth/logout'
      >
        <FontAwesomeIcon
          icon={faPowerOff}
          color='red'
          size='2x'
        />
      </Link>
    </div>
  )
}

export default AppToolbar
