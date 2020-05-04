import React from 'react'

import hooks, {
  useDispatcher,
  useSelector,
  useTranslation,
} from '../../../utils/hooks'

import { selectors as AuthSelectors } from '../../../store/auth'
import { selectors as UsersSelectors } from '../../../store/rest/users'
import { selectors as FriendshipsSelectors } from '../../../store/rest/friendships'
import { selectors as ThreadsSelectors } from '../../../store/rest/threads'

import {
  RequestState,
} from '../../../utils/constants'

import RestService from '../../../services/RestService'

import {
  Link,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'

import ProfileFriends from './friends/ProfileFriends'
import ProfileThread from './threads/ProfileThread'
import FriendListItem from '../../commons/composite/FriendListItem'

import './Profile.scss'

/* PROFILE */

interface ProfileProps {}

const Profile = (props: ProfileProps) => {

  return (
    <div className='Profile MainContent-area'>
      <ProfileMenu />
      <Switch>
        <Route path='/profile/friends'>
          <ProfileFriends />
        </Route>
        <Route path='/profile/threads/:threadId'>
          <ProfileThread />
        </Route>
        <Route path='/profile'>
          Profile
        </Route>
        <Route path='*'>
          <Redirect to='/profile' />
        </Route>
      </Switch>
    </div>
  )
}

/* PROFILE MENU */

interface ProfileMenuProps {}

const ProfileMenu = (props: ProfileMenuProps) => {
  const { t } = useTranslation()

  return (
    <div className='ProfileMenu MainContent-menu'>
      <div className='ProfileMenu-header MainContent-menu-header'>
        {t('main.profile.menu.title')}
      </div>
      <div className='ProfileMenu-content MainContent-menu-section'>
        <div className='MainContent-menu-section-title'>
          <Link
            to={`/profile/friends`}
          >
            {t('main.profile.menu.section.friends')}
          </Link>
        </div>
      </div>
      <div className='ProfileMenu-content MainContent-menu-section'>
        <div className='MainContent-menu-section-title'>
          {t('main.profile.menu.section.conversations')}
        </div>
        <div className='MainContent-menu-section-content'>
          <ProfileMenuThreads />
        </div>
      </div>
    </div>
  )
}

/* PROFILE MENU THREADS */

const ProfileMenuThreads = () => {
  const { t } = useTranslation()

  const dispatch = useDispatcher()

  const userId = useSelector(AuthSelectors.authUserSelector)
  const threadsData = useSelector(UsersSelectors.restUserThreadsDataSelector(userId))
  const threadsStatus = hooks.useUserThreads(userId)

  switch (threadsStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <div>
          Loading...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return threadsData.map(
        (id: string) => <ProfileMenuThread key={id} id={id} />
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

/* PROFILE MENU THREAD */

interface ProfileMenuThreadProps {
  id: string
}

const ProfileMenuThread = (props: ProfileMenuThreadProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatcher()

  const currentUserId = useSelector(AuthSelectors.authUserSelector)
  const threadData = useSelector(ThreadsSelectors.restThreadDataSelector(props.id))
  const threadStatus = hooks.useThread(props.id)

  switch (threadStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <div>
          Loading thread...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return (
        <ProfileMenuThreadDirect
          id={props.id}
          userId={threadData.userId.find((userId: string) => userId != currentUserId)}
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


/* PROFILE THREAD */

interface ProfileThreadDirectProps {
  id: string,
  userId: string
}

const ProfileMenuThreadDirect = (props: ProfileThreadDirectProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatcher()

  const userData = useSelector(UsersSelectors.restUserDataSelector(props.userId))
  const userStatus = hooks.useUser(props.userId)

  switch (userStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <div>
          Loading user...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return (
        <Link
          to={`/profile/threads/${props.id}`}
        >
          <FriendListItem
            name={userData.name}
            image={userData.image}
          />
        </Link>
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

export default Profile
