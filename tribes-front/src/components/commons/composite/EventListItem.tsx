import React from 'react'

import {
  dateString
} from '../../../utils/date'

import'./EventListItem.scss'

interface EventListItemProps {
  name: string,
}

const EventListItem = (props: EventListItemProps) => {

  return (
    <div
      className='EventListItem'
    >
      <div>
        <span
          className='EventListItem-name'
        >
          #{props.name}
        </span>
      </div>
    </div>
  )
}

export default EventListItem
