import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import './Recover.scss'

/* RECOVER */

interface RecoverProps {
}

const Recover = (props: RecoverProps) => {

  return (
    <div className='Recover'>
      <div>
        Recover
      </div>
      <Link
        className=''
        to='/'
      >
        Back
      </Link>
    </div>
  )
}

export default Recover
