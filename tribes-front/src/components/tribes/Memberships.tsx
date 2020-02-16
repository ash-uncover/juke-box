import React, {
  useEffect
} from 'react'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  authUserSelector
} from '../../store/auth/selectors'

import {
  restUserMembershipsDataSelector,
  restUserMembershipsStatusSelector,
  restUserMembershipsErrorSelector
} from '../../store/rest/users/selectors'

import {
  restMembershipDataSelector,
  restMembershipStatusSelector,
  restMembershipErrorSelector
} from '../../store/rest/memberships/selectors'

import {
  restTribeDataSelector,
  restTribeStatusSelector,
  restTribeErrorSelector
} from '../../store/rest/tribes/selectors'

import {
  RequestState
} from '../../utils/constants'

import RestService from '../../services/RestService'

import './Memberships.scss'

/* MEMBERSHIPS */

interface MembershipsProps {
}

const Memberships = (props: MembershipsProps) => {
  const dispatch = useDispatch()

  const userId = useSelector(authUserSelector)
  const membershipsData = useSelector(restUserMembershipsDataSelector(userId))
  const membershipsStatus = useSelector(restUserMembershipsStatusSelector(userId))

  useEffect(() => {
    if (membershipsStatus === RequestState.NEVER) {
      RestService.rest.users.memberships.getAll(dispatch, userId)
    }
  })

  return (
    <div className='Memberships'>
      { membershipsStatus === RequestState.NEVER && 'Loading...' }
      { membershipsStatus === RequestState.FETCHING && 'Loading...' }
      { membershipsStatus === RequestState.SUCCESS && membershipsData.map((id: string) => <Membership key={id} id={id} />)}
      { membershipsStatus === RequestState.FAILURE && 'Error' }
    </div>
  )
}

/* MEMBERSHIP */

interface MembershipProps {
  id: string
}

const Membership = (props: MembershipProps) => {
  const dispatch = useDispatch()

  const membershipData = useSelector(restMembershipDataSelector(props.id))
  const membershipStatus = useSelector(restMembershipStatusSelector(props.id))

  useEffect(() => {
    if (membershipStatus === RequestState.NEVER) {
      RestService.rest.memberships.get(dispatch, props.id)
    }
  })

  return (
    <div className='Membership'>
      { membershipStatus === RequestState.NEVER && `Loading... ${props.id}` }
      { membershipStatus === RequestState.FETCHING && `Loading... ${props.id}` }
      { membershipStatus === RequestState.SUCCESS && <Tribe id={membershipData.tribeId} /> }
      { membershipStatus === RequestState.FAILURE && `Error ${props.id}` }
    </div>
  )
}

/* TRIBE */

interface TribeProps {
  id: string
}

const Tribe = (props: TribeProps) => {
  const dispatch = useDispatch()

  const tribeData = useSelector(restTribeDataSelector(props.id))
  const tribeStatus = useSelector(restTribeStatusSelector(props.id))

  useEffect(() => {
    if (tribeStatus === RequestState.NEVER) {
      RestService.rest.tribes.get(dispatch, props.id)
    }
  })

  return (
    <div className='Tribe'>
      { tribeStatus === RequestState.NEVER && `Loading... ${props.id}` }
      { tribeStatus === RequestState.FETCHING && `Loading... ${props.id}` }
      { tribeStatus === RequestState.SUCCESS && tribeData.name }
      { tribeStatus === RequestState.FAILURE && `Error ${props.id}` }
    </div>
  )
}

export default Memberships
