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
  restUserDataSelector,
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

import {
  Link,
  Redirect,
  Switch,
  Route
} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import Image from '../commons/Image'

import './Main.scss'

/* Main */

interface MainProps {}

const Main = (props: MainProps) => {

  return (
    <div className='Main'>
      <MainToolbar />
      <MainMenu />
      <MainContent />
    </div>
  )
}

/* MainToolbar */

interface MainToolbarProps {}

const MainToolbar = (props: MainToolbarProps) => {
  const userId = useSelector(authUserSelector)
  const userData = useSelector(restUserDataSelector(userId))

  return (
    <div className='MainToolbar'>
      <span
        className='MainToolbar-title'>
        TRIBES
      </span>
      <span
        className='MainToolbar-welcome'>
        logged as {userData.username}
      </span>
      <Link
        className='MainToolbar-logoff'
        to='/auth/logout'
      >
        <FontAwesomeIcon
          icon={faPowerOff}
          color='white'
          size='1x'
        />
      </Link>
    </div>
  )
}

/* MainMenu */

export interface MainMenuProps {}

export const MainMenu = (props: MainMenuProps) => {
  return (
    <div className='MainMenu'>
      <MainMenuItem
        name='Profile'
        to='/profile'
      />
      <div
        className='MainMenu-separator'
      />
      <MainMenuMemberships />
      <div
        className='MainMenu-separator'
      />
      <MainMenuItem
        name='Add'
      />
    </div>
  )
}

/* MainMenuMemberships */

export interface MainMenuMembershipsProps {}

export const MainMenuMemberships = (props: MainMenuMembershipsProps) => {
  const dispatch = useDispatch()

  const userId = useSelector(authUserSelector)
  const membershipsData = useSelector(restUserMembershipsDataSelector(userId))
  const membershipsStatus = useSelector(restUserMembershipsStatusSelector(userId))

  useEffect(() => {
    if (membershipsStatus === RequestState.NEVER) {
      RestService.rest.users.memberships.getAll(dispatch, userId)
    }
  })

  switch (membershipsStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <MainMenuItem
          name='Loading...'
        />
      )
    }
    case RequestState.SUCCESS: {
      return membershipsData.map(
        (id: string) => <MainMenuMembership key={id} id={id} />
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <MainMenuItem
          name='Error'
        />
      )
    }
  }
}

/* MEMBERSHIP */

export interface MainMenuMembershipProps {
  id: string
}

export const MainMenuMembership = (props: MainMenuMembershipProps) => {
  const dispatch = useDispatch()

  const membershipData = useSelector(restMembershipDataSelector(props.id))
  const membershipStatus = useSelector(restMembershipStatusSelector(props.id))

  useEffect(() => {
    if (membershipStatus === RequestState.NEVER) {
      RestService.rest.memberships.get(dispatch, props.id)
    }
  })

  switch (membershipStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <MainMenuItem
          name='Loading...'
        />
      )
    }
    case RequestState.SUCCESS: {
      return (
        <MainMenuTribe
          id={membershipData.tribeId}
        />
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <MainMenuItem
          name='Error'
        />
      )
    }
  }
}

/* MainMenuTribe */

export interface MainMenuTribeProps {
  id: string
}

export const MainMenuTribe = (props: MainMenuTribeProps) => {
  const dispatch = useDispatch()

  const tribeData = useSelector(restTribeDataSelector(props.id))
  const tribeStatus = useSelector(restTribeStatusSelector(props.id))

  useEffect(() => {
    if (tribeStatus === RequestState.NEVER) {
      RestService.rest.tribes.get(dispatch, props.id)
    }
  })

  switch (tribeStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <MainMenuItem
          name='Loading...'
        />
      )
    }
    case RequestState.SUCCESS: {
      return (
        <MainMenuItem
          to={`/tribes/${tribeData.id}`}
          name={tribeData.name}
          image={tribeData.image}
        />
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <MainMenuItem
          name='Error'
        />
      )
    }
  }
}

/* MainMenuItem */

export interface MainMenuItemProps {
  name: string,
  to?: string,
  image?: string
}

export const MainMenuItem = (props: MainMenuItemProps) => {
  if (props.to) {
    return (
      <Link
        className='MainMenuItem'
        to={props.to}
      >
        {props.image
        ?
          <Image
            src={props.image}
            title={props.name}
          />
        :
          props.name
        }
      </Link>
    )
  }
  return (
    <div
      className='MainMenuItem'
    >
      {props.name}
    </div>
  )
}

/* MainContent */

export interface MainContentProps {
}

export const MainContent = (props: MainMenuProps) => {
  return (
    <div className='MainContent'>
      <Switch>
        <Route path='/profile'>
          <div>Profile</div>
        </Route>
        <Route path='/tribes'>
          <div>tribe</div>
        </Route>
        <Route path='*'>
          <Redirect to='/profile' />
        </Route>
      </Switch>
    </div>
  )
}

export default Main
