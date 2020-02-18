import React from 'react'

import Image from './Image'

import { UserStatus } from '../../utils/constants'

import'./FriendListItem.scss'

interface FriendListItemProps {
  name: string,
  image: string,
  status?: UserStatus
}

const FriendListItem = (props: FriendListItemProps) => {
  let status = props.status || UserStatus.OFFLINE

  return (
    <div
      className='FriendListItem'
    >
      <div
        className={`FriendListItem-image-area FriendListItem-status-${status.toLowerCase()}`}
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
