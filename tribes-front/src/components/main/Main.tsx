import React from 'react'

import {
  useDispatcher,
  useEffect,
  useSelector,
  useRouteMatch,
  useTranslation,
  useParams,
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
import MainMenuItem from './MainMenuItem'

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
  const { url } = useRouteMatch()
  return (
    <div
      className='MainMenu'
    >
      <MainMenuItem
        to='/profile'
        selected={url === '/profile'}
      >
        <FontAwesomeIcon
          icon={faHiking}
          color='white'
          size='2x'
        />
      </MainMenuItem>
      <div
        className='MainMenu-separator'
      />
      <MainMenuMemberships />
      <div
        className='MainMenu-separator'
      />
      <MainMenuItem>
        <FontAwesomeIcon
          icon={faPlusCircle}
          color='white'
          size='3x'
        />
      </MainMenuItem>
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
        <MainMenuItem>
          Loading...
        </MainMenuItem>
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
        <MainMenuItem>
          Error
        </MainMenuItem>
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
        <MainMenuItem>
          Loading...
        </MainMenuItem>
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
        <MainMenuItem>
          Error
        </MainMenuItem>
      )
    }
  }
}

/* MainMenuTribe */

export interface MainMenuTribeProps {
  id: string
}
interface TribeRouteParamTypes {
  tribeId: string
}

export const MainMenuTribe = (props: MainMenuTribeProps) => {
  const dispatch = useDispatcher()

  const tribeData = useSelector(TribesSelectors.restTribeDataSelector(props.id))
  const tribeStatus = useSelector(TribesSelectors.restTribeStatusSelector(props.id))

  const { url, path } = useRouteMatch()
  console.log(`url: ${url}`)
  console.log(`path: ${path}`)
  const { tribeId } = useParams<TribeRouteParamTypes>()
  console.log(`tribeId: ${tribeId}`)

  useEffect(() => {
    if (tribeStatus === RequestState.NEVER) {
      RestService.rest.tribes.get(dispatch, props.id)
    }
  })

  switch (tribeStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <MainMenuItem>
          Loading...
        </MainMenuItem>
      )
    }
    case RequestState.SUCCESS: {
      return (
        <MainMenuItem
          to={`/tribes/${tribeData.id}`}
          selected={url.includes(`/tribes/${tribeData.id}`)}
        >
          <Image
            src={tribeData.image}
            title={tribeData.name}
          />
        </MainMenuItem>
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <MainMenuItem>
          Error
        </MainMenuItem>
      )
    }
  }
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
