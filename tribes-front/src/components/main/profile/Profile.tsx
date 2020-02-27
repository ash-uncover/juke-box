import React, {
  useEffect
} from 'react'

import {
  useSelector,
} from 'react-redux'

import {
  useDispatcher,
} from '../../../utils/hooks'

import {
  useTranslation,
} from 'react-i18next'

import { selectors as AuthSelectors } from '../../../store/auth'
import { selectors as UsersSelectors } from '../../../store/rest/users'
import { selectors as FriendshipsSelectors } from '../../../store/rest/friendships'
import { selectors as ThreadsSelectors } from '../../../store/rest/threads'

import {
  RequestState,
  UserStatus,
} from '../../../utils/constants'

import RestService from '../../../services/RestService'

import FriendListItem from '../../commons/FriendListItem'

import './Profile.scss'

/* PROFILE */

interface ProfileProps {}

const Profile = (props: ProfileProps) => {

  return (
    <div className='Profile MainContent-area'>
      <ProfileMenu />
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
          {t('main.profile.menu.section.friends')}
        </div>
        <div className='MainContent-menu-section-content'>
          <ProfileFriendships />
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

/* PROFILE FRIENDSHIPS */

interface ProfileFriendshipsProps {}

const ProfileFriendships = (props: ProfileFriendshipsProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatcher()

  const userId = useSelector(AuthSelectors.authUserSelector)
  const friendshipsData = useSelector(UsersSelectors.restUserFriendshipsDataSelector(userId))
  const friendshipsStatus = useSelector(UsersSelectors.restUserFriendshipsStatusSelector(userId))

  useEffect(() => {
    if (friendshipsStatus === RequestState.NEVER) {
      RestService.rest.users.friendships.getAll(dispatch, userId)
    }
  })

  switch (friendshipsStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <div>
          Loading...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      return friendshipsData.map(
        (id: string) => <ProfileFriendship key={id} id={id} />
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

/* PROFILE FRIENDSHIP */

export interface ProfileFriendshipProps {
  id: string
}

export const ProfileFriendship = (props: ProfileFriendshipProps) => {
  const dispatch = useDispatcher()

  const friendshipData = useSelector(FriendshipsSelectors.restFriendshipDataSelector(props.id))
  const friendshipStatus = useSelector(FriendshipsSelectors.restFriendshipStatusSelector(props.id))

  useEffect(() => {
    if (friendshipStatus === RequestState.NEVER) {
      RestService.rest.friendships.get(dispatch, props.id)
    }
  })

  switch (friendshipStatus) {
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
        <ProfileFriend
          id={friendshipData.friendId}
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


/* PROFILE FRIEND */

export interface ProfileFriendProps {
  id: string
}

export const ProfileFriend = (props: ProfileFriendProps) => {
  const dispatch = useDispatcher()

  const userData = useSelector(UsersSelectors.restUserDataSelector(props.id))
  const userStatus = useSelector(UsersSelectors.restUserStatusSelector(props.id))

  useEffect(() => {
    if (userStatus === RequestState.NEVER) {
      RestService.rest.users.get(dispatch, props.id)
    }
  })

  switch (userStatus) {
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
        <div>
          {userData.name}
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

export default Profile
