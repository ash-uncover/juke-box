import React, { useState } from 'react'

import { Tribe, User } from '../../types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThList, faTh, faThLarge } from '@fortawesome/free-solid-svg-icons'

import './Tribes.scss'

/* TRIBES */

interface TribesProps {
  tracks: Array<User>
}

const Tribes = (props: TribesProps) => {
  return (
    <div className='Tribes'>
    </div>
  )
}

export default Tribes
