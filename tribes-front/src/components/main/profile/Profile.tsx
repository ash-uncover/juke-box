import React from 'react'

import {
  useDispatcher,
  useEffect,
  useSelector,
  useTranslation,
} from '../../../utils/hooks'

import { selectors as AuthSelectors } from '../../../store/auth'
import { selectors as UsersSelectors } from '../../../store/rest/users'
import { selectors as FriendshipsSelectors } from '../../../store/rest/friendships'
import { selectors as ThreadsSelectors } from '../../../store/rest/threads'

import {
  RequestState,
  UserStatus,
} from '../../../utils/constants'

import RestService from '../../../services/RestService'

import {
  Link,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom'

import ProfileFriends from './ProfileFriends'
import ProfileThreadContent from './ProfileThread'
import FriendListItem from '../../commons/FriendListItem'

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
          <ProfileThreadContent />
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
          <ProfileThreads />
        </div>
      </div>
    </div>
  )
}

/* PROFILE THREADS */

interface ProfileThreadsProps {}

const ProfileThreads = (props: ProfileThreadsProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatcher()

  const userId = useSelector(AuthSelectors.authUserSelector)
  const threadsData = useSelector(UsersSelectors.restUserThreadsDataSelector(userId))
  const threadsStatus = useSelector(UsersSelectors.restUserThreadsStatusSelector(userId))

  useEffect(() => {
    if (threadsStatus === RequestState.NEVER) {
      RestService.rest.users.threads.getAll(dispatch, userId)
    }
  })

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
        (id: string) => <ProfileThread key={id} id={id} />
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

interface ProfileThreadProps {
  id: string
}

const ProfileThread = (props: ProfileThreadProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatcher()

  const currentUserId = useSelector(AuthSelectors.authUserSelector)
  const threadData = useSelector(ThreadsSelectors.restThreadDataSelector(props.id))
  const threadStatus = useSelector(ThreadsSelectors.restThreadStatusSelector(props.id))

  useEffect(() => {
    if (threadStatus === RequestState.NEVER) {
      RestService.rest.threads.get(dispatch, props.id)
    }
  })

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
        <ProfileThreadDirect
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

const ProfileThreadDirect = (props: ProfileThreadDirectProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatcher()

  const threadData = useSelector(ThreadsSelectors.restThreadDataSelector(props.id))

  const userData = useSelector(UsersSelectors.restUserDataSelector(props.userId))
  const userStatus = useSelector(UsersSelectors.restUserStatusSelector(props.userId))

  useEffect(() => {
    if (userStatus === RequestState.NEVER) {
      RestService.rest.users.get(dispatch, props.userId)
    }
  })

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
