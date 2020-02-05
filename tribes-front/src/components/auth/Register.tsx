import React from 'react'

import { Link } from 'react-router-dom'

import './Recover.scss'

/* REGISTER */

interface RegisterProps {
}

const Register = (props: RegisterProps) => {

  return (
    <div className='Register'>
      <div>
        Register
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

export default Register
