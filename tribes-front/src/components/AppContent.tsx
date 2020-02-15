import React, { useState } from 'react'

import Tribes from './tribes/Tribes'

import './AppContent.scss'

/* AppContent */

interface AppContentProps {
}

const AppContent = (props: AppContentProps) => {
  return (
    <div className='AppContent'>
      <div className='AppContent-main-menu'>
        <Tribes />
      </div>
    </div>
  )
}

export default AppContent
