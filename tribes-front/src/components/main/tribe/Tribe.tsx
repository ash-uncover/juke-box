import React, {
  useEffect,
} from 'react'

import {
  useParams,
} from 'react-router-dom'

import {
  useSelector,
} from 'react-redux'

import {
  useDispatcher,
} from '../../../utils/hooks'

import {
  serverUserStatusSelector,
} from '../../../store/socket/selectors'

import {
  restMembershipDataSelector,
  restMembershipStatusSelector,
  restMembershipErrorSelector,
} from '../../../store/rest/memberships/selectors'

import {
  restTribeDataSelector,
  restTribeStatusSelector,
  restTribeErrorSelector,
  restTribeMembershipsDataSelector,
  restTribeMembershipsStatusSelector,
  restTribeMembershipsErrorSelector,
  restTribeEventsDataSelector,
  restTribeEventsStatusSelector,
  restTribeEventsErrorSelector
} from '../../../store/rest/tribes/selectors'

import {
  restUserDataSelector,
  restUserStatusSelector,
  restUserErrorSelector,
} from '../../../store/rest/users/selectors'

import {
  restEventDataSelector,
  restEventStatusSelector,
  restEventErrorSelector,
} from '../../../store/rest/events/selectors'

import EventListItem from '../../commons/EventListItem'

import FriendListItem from '../../commons/FriendListItem'
import Image from '../../commons/Image'

import {
  RequestState,
  UserStatus,
} from '../../../utils/constants'

import RestService from '../../../services/RestService'

import './Tribe.scss'
import {
  MembershipData, EventData,
} from '../../../types'

interface TribeRouteParamTypes {
  tribeId: string
}

/* TRIBE */

interface TribeProps {}

const Tribe = (props: TribeProps) => {
  const { tribeId } = useParams<TribeRouteParamTypes>()

  const dispatch = useDispatcher()
  const tribeStatus = useSelector(restTribeStatusSelector(tribeId))
  const membershipsStatus = useSelector(restTribeMembershipsStatusSelector(tribeId))
  const eventsStatus = useSelector(restTribeEventsStatusSelector(tribeId))

  useEffect(() => {
    if (tribeStatus === RequestState.NEVER) {
      RestService.rest.tribes.get(dispatch, tribeId)
    }
  })

  useEffect(() => {
    if (membershipsStatus === RequestState.NEVER) {
      RestService.rest.tribes.memberships.getAll(dispatch, tribeId)
    }
  })

  useEffect(() => {
    if (eventsStatus === RequestState.NEVER) {
      RestService.rest.tribes.events.getAll(dispatch, tribeId)
    }
  })

  switch (tribeStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <div>
          Loading...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return (
        <div className='Tribe MainContent-area'>
          <TribeMenu />
          <TribeContent />
        </div>
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div>
          Error
        </div>
      )
    }
  }
}

/* TRIBE MENU */

interface TribeMenuProps {}

const TribeMenu = (props: TribeMenuProps) => {
  const { tribeId } = useParams<TribeRouteParamTypes>()

  const tribeData = useSelector(restTribeDataSelector(tribeId))

  return (
    <div className='TribeMenu MainContent-menu'>
      <div className='TribeMenu-header MainContent-menu-header'>
        {tribeData.name}
      </div>
      <TribeEvents/>
    </div>
  )
}

/* TRIBE CONTENT */

interface TribeContentProps {}

const TribeContent = (props: TribeContentProps) => {
  const { tribeId } = useParams<TribeRouteParamTypes>()

  const tribeData = useSelector(restTribeDataSelector(tribeId))

  return (
    <div className='TribeContent'>
      <div className='TribeContent-header'>
        header
      </div>
      <div className='TribeContent-main'>
        <div className='TribeContent-content'>
          content
        </div>
        <div className='TribeContent-users'>
          <TribeMemberships />
        </div>
      </div>
    </div>
  )
}


/* TRIBE USERS */

const TribeMemberships = () => {
  const { tribeId } = useParams<TribeRouteParamTypes>()

  const membershipsData = useSelector(restTribeMembershipsDataSelector(tribeId))
  const membershipsStatus = useSelector(restTribeMembershipsStatusSelector(tribeId))

  switch (membershipsStatus) {
    case RequestState.NEVER: {
      return (
        <div>
          Not Loaded
        </div>
      )
    }
    case RequestState.FETCHING: {
      return (
        <div>
          Loading...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return (
        <div className='TribeUsers'>
          Users - {membershipsData.length}
          { membershipsData.map((membership: string) => <TribeMembership key={membership} id={membership} />) }
        </div>
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div>
          Error
        </div>
      )
    }
  }
}

/* TRIBE MEMBERSHIP */

interface TribeMembershipProps {
  id: string
}

const TribeMembership = (props: TribeMembershipProps) => {
  const dispatch = useDispatcher()
  const membershipData = useSelector(restMembershipDataSelector(props.id))
  const membershipStatus = useSelector(restMembershipStatusSelector(props.id))

  useEffect(() => {
    if (membershipStatus === RequestState.NEVER) {
      RestService.rest.memberships.get(dispatch, props.id)
    }
  })

  switch (membershipStatus) {
    case RequestState.NEVER: {
      return (
        <div>
          Not Loaded
        </div>
      )
    }
    case RequestState.FETCHING: {
      return (
        <div>
          Loading...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return (
        <TribeUser
          id={membershipData.userId}
        />
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div>
          Error
        </div>
      )
    }
  }
}

/* TRIBE USER */

interface TribeUserProps {
  id: string
}

const TribeUser = (props: TribeUserProps) => {
  const dispatch = useDispatcher()

  const userData = useSelector(restUserDataSelector(props.id))
  const userDataStatus = useSelector(restUserStatusSelector(props.id))

  const userStatus = useSelector(serverUserStatusSelector(props.id))

  useEffect(() => {
    if (userDataStatus === RequestState.NEVER) {
      RestService.rest.users.get(dispatch, props.id)
    }
  })

  switch (userDataStatus) {
    case RequestState.NEVER: {
      return (
        <div>
          Not Loaded
        </div>
      )
    }
    case RequestState.FETCHING: {
      return (
        <div>
          Loading...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return (
        <FriendListItem
          name={userData.name}
          image={userData.image}
          status={userStatus || UserStatus.OFFLINE}
        />
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div>
          Error
        </div>
      )
    }
  }
}

/* TRIBE EVENTS */

const TribeEvents = () => {

  const { tribeId } = useParams<TribeRouteParamTypes>()
  const dispatch = useDispatcher()
  const eventsData = useSelector(restTribeEventsDataSelector(tribeId))
  const eventDataStatus = useSelector(restTribeEventsStatusSelector(tribeId))

  useEffect(() => {
    if (eventDataStatus === RequestState.NEVER) {
      RestService.rest.events.get(dispatch, tribeId)
    }
  })

  switch (eventDataStatus) {
    case RequestState.NEVER: {
      return (
        <div>
          Not Loaded
        </div>
      )
    }
    case RequestState.FETCHING: {
      return (
        <div>
          Loading...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return (
        <div className='TribeEvents'>
         { eventsData.map((eventId: string) => <TribeEvent key={eventId} id={eventId} />) }
      </div>
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div>
          Error
        </div>
      )
    }
  }
}

/* TRIBE EVENT */

interface TribeEventProps {
  id: string
}

const TribeEvent = (props: TribeEventProps) => {
  const dispatch = useDispatcher()
  const eventData = useSelector(restEventDataSelector(props.id))
  const eventStatus = useSelector(restEventStatusSelector(props.id))

  useEffect(() => {
    if (eventStatus === RequestState.NEVER) {
      RestService.rest.events.get(dispatch, props.id)
    }
  })

  switch (eventStatus) {
    case RequestState.NEVER: {
      return (
        <div>
          Not Loaded
        </div>
      )
    }
    case RequestState.FETCHING: {
      return (
        <div>
          Loading...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return (
        <EventListItem
          name={eventData.name}
          startDate={eventData.dateStart}
          endDate={eventData.dateEnd}
      />
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div>
          Error
        </div>
      )
    }
  }
}

export default Tribe
