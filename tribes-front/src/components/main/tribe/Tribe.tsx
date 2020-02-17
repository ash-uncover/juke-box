import React, {
  useEffect
} from 'react'

import {
  useParams
} from 'react-router-dom'

import {
  useDispatch,
  useSelector
} from 'react-redux'

import {
  restTribeDataSelector,
  restTribeStatusSelector,
  restTribeErrorSelector,
  restTribeMembershipsDataSelector,
  restTribeMembershipsStatusSelector,
  restTribeMembershipsErrorSelector
} from '../../../store/rest/tribes/selectors'

import {
  RequestState
} from '../../../utils/constants'

import RestService from '../../../services/RestService'

import './Tribe.scss'

interface TribeRouteParamTypes {
  tribeId: string
}

/* TRIBE */

interface TribeProps {}

const Tribe = (props: TribeProps) => {
  const { tribeId } = useParams<TribeRouteParamTypes>()

  const dispatch = useDispatch()
  const tribeStatus = useSelector(restTribeStatusSelector(tribeId))
  const membershipsStatus = useSelector(restTribeMembershipsStatusSelector(tribeId))

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
        <div className='Tribe'>
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
    <div className='TribeMenu'>
      <div className='TribeMenu-header'>
        {tribeData.name}
      </div>
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
          <TribeUsers />
        </div>
      </div>
    </div>
  )
}


/* TRIBE USERS */

const TribeUsers = () => {
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
          users
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

export default Tribe
