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

import { selectors as SocketSelectors } from '../../../store/socket'
import { selectors as MembershipsSelectors } from '../../../store/rest/memberships'
import { selectors as TribesSelectors } from '../../../store/rest/tribes'
import { selectors as UsersSelectors } from '../../../store/rest/users'

import FriendListItem from '../../commons/FriendListItem'
import Image from '../../commons/Image'

import {
  RequestState,
  UserStatus,
} from '../../../utils/constants'

import RestService from '../../../services/RestService'

import './Tribe.scss'
import {
  MembershipData,
} from '../../../types'

interface TribeRouteParamTypes {
  tribeId: string
}

/* TRIBE */

interface TribeProps {}

const Tribe = (props: TribeProps) => {
  const { tribeId } = useParams<TribeRouteParamTypes>()

  const dispatch = useDispatcher()
  const tribeStatus = useSelector(TribesSelectors.restTribeStatusSelector(tribeId))
  const membershipsStatus = useSelector(TribesSelectors.restTribeMembershipsStatusSelector(tribeId))

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

  const tribeData = useSelector(TribesSelectors.restTribeDataSelector(tribeId))

  return (
    <div className='TribeMenu MainContent-menu'>
      <div className='TribeMenu-header MainContent-menu-header'>
        {tribeData.name}
      </div>
    </div>
  )
}

/* TRIBE CONTENT */

interface TribeContentProps {}

const TribeContent = (props: TribeContentProps) => {
  const { tribeId } = useParams<TribeRouteParamTypes>()

  const tribeData = useSelector(TribesSelectors.restTribeDataSelector(tribeId))

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

  const membershipsData = useSelector(TribesSelectors.restTribeMembershipsDataSelector(tribeId))
  const membershipsStatus = useSelector(TribesSelectors.restTribeMembershipsStatusSelector(tribeId))

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
  const membershipData = useSelector(MembershipsSelectors.restMembershipDataSelector(props.id))
  const membershipStatus = useSelector(MembershipsSelectors.restMembershipStatusSelector(props.id))

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

  const userData = useSelector(UsersSelectors.restUserDataSelector(props.id))
  const userDataStatus = useSelector(UsersSelectors.restUserStatusSelector(props.id))

  const userStatus = useSelector(SocketSelectors.serverUserStatusSelector(props.id))

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

export default Tribe
