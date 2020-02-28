import React from 'react'

import Image from './Image'

import {
  UserStatus,
} from '../../utils/constants'

import'./FriendListItem.scss'

interface FriendListItemProps {
  name: string,
  image: string,
  status?: UserStatus
}

const FriendListItem = (props: FriendListItemProps) => {
  let statusClass = 'FriendListItem-image-area'
  if (props.status) {
    statusClass += ` FriendListItem-status-${props.status.toLowerCase()}`
  }
  return (
    <div
      className='FriendListItem'
    >
      <div
        className={statusClass}
      >
        <Image
          className='FriendListItem-image'
          src={props.image}
        />
      </div>
      <span
        className='FriendListItem-name'
      >
        {props.name}
      </span>
    </div>
  )
}

export default FriendListItem
