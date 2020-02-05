import React, { useState } from 'react'

import { User } from '../../types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThList, faTh, faThLarge } from '@fortawesome/free-solid-svg-icons'

import './Friends.scss'

/* FRIENDS */

interface FriendsProps {
  tracks: Array<User>
}

const Friends = (props: FriendsProps) => {
  return (
    <div className='Friends'>
    </div>
  )
}

export default Friends
