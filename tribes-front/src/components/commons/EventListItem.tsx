import React from 'react'

import {
  dateString
} from '../../utils/date'

import'./EventListItem.scss'

interface EventListItemProps {
  name: string,
  startDate: string,
  endDate: string,
}

const EventListItem = (props: EventListItemProps) => {

  const startDate = dateString(new Date(props.startDate))
  const endDate = dateString(new Date(props.endDate))

  return (
    <div
      className='EventListItem'
    >
        <div
        >
          <span
              className='EventListItem-name'
            >
              #{props.name}
          </span>
        </div>

        <div
        >
          <span
            className='EventListItem-date'
          >
            From {startDate}
          </span>
        </div>
        <div
        >
          <span
            className='EventListItem-date'
          >
            To  {endDate}
          </span>
        </div>

    </div>
  )
}

export default EventListItem
