import React from 'react'

import {
  useDispatcher,
  useEffect,
  useSelector,
  useTranslation,
} from '../../utils/hooks'

import { selectors as AuthSelectors } from '../../store/auth'
import { selectors as UsersSelectors } from '../../store/rest/users'
import { selectors as MembershipsSelectors } from '../../store/rest/memberships'
import { selectors as TribesSelectors } from '../../store/rest/tribes'

import {
  RequestState,
} from '../../utils/constants'

import RestService from '../../services/RestService'

import {
  Link,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'

import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome'

import {
  faHiking,
  faMountain,
  faPowerOff,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'

import Profile from './profile/Profile'
import Tribe from './tribe/Tribe'
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
  const { t } = useTranslation()

  const userId = useSelector(AuthSelectors.authUserSelector)
  const userData = useSelector(UsersSelectors.restUserDataSelector(userId))

  return (
    <div className='MainToolbar'>
      <span
        className='MainToolbar-title'>
        {t('main.title')}
      </span>
      <span
        className='MainToolbar-welcome'>
        {t('main.welcome', { name: userData.name })}
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
      <Link
        className='MainMenuItem'
        to='/profile'
      >
        <FontAwesomeIcon
          icon={faHiking}
          color='white'
          size='2x'
        />
      </Link>
      <div
        className='MainMenu-separator'
      />
      <MainMenuMemberships />
      <div
        className='MainMenu-separator'
      />
      <div
        className='MainMenuItem'
      >
        <FontAwesomeIcon
          icon={faPlusCircle}
          color='white'
          size='3x'
        />
      </div>
    </div>
  )
}

/* MainMenuMemberships */

export interface MainMenuMembershipsProps {}

export const MainMenuMemberships = (props: MainMenuMembershipsProps) => {
  const dispatch = useDispatcher()

  const userId = useSelector(AuthSelectors.authUserSelector)
  const membershipsData = useSelector(UsersSelectors.restUserMembershipsDataSelector(userId))
  const membershipsStatus = useSelector(UsersSelectors.restUserMembershipsStatusSelector(userId))

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
  const dispatch = useDispatcher()

  const membershipData = useSelector(MembershipsSelectors.restMembershipDataSelector(props.id))
  const membershipStatus = useSelector(MembershipsSelectors.restMembershipStatusSelector(props.id))

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
  const dispatch = useDispatcher()

  const tribeData = useSelector(TribesSelectors.restTribeDataSelector(props.id))
  const tribeStatus = useSelector(TribesSelectors.restTribeStatusSelector(props.id))

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
          <Profile />
        </Route>
        <Route path='/tribes/:tribeId'>
          <Tribe />
        </Route>
        <Route path='*'>
          <Redirect to='/profile' />
        </Route>
      </Switch>
    </div>
  )
}

export default Main
