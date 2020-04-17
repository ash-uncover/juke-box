import React from 'react'

import {
  dateString
} from '../../../utils/date'

import'./Event.scss'

import {
  useDispatcher,
  useEffect,
  useSelector,
  useParams,
} from '../../../utils/hooks'

import { selectors as EventsSelectors } from '../../../store/rest/events'

import {  } from 'react-redux'

interface EventRouteParamTypes {
  eventId: string
}

interface EventProps {

}

const Event = (props: EventProps) => {
  const { eventId } = useParams<EventRouteParamTypes>()
  const eventData = useSelector(EventsSelectors.restEventDataSelector(eventId))
 return (
    <div
      className='Event'
    >
      <div>
        <span
          className='Event-name'
        >
          #{eventData.name}
        </span>
      </div>
      <div>
        <span
          className='Event-startdate'
        >
          {eventData.startDate}
        </span>
        <span
          className='Event-enddate'
        >
          {eventData.endDate}
        </span>
      </div>
    </div>
  )
}

export default Event