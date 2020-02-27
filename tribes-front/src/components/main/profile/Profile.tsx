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

import {
  authUserSelector,
} from '../../../store/auth/selectors'

import {
  restUserDataSelector,
  restUserStatusSelector,
  restUserErrorSelector,
  restUserFriendshipsDataSelector,
  restUserFriendshipsStatusSelector,
  restUserFriendshipsErrorSelector,
} from '../../../store/rest/users/selectors'

import {
  restFriendshipDataSelector,
  restFriendshipStatusSelector,
  restFriendshipErrorSelector,
} from '../../../store/rest/friendships/selectors'

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
          <ProfileFriendsMenu />
        </div>
      </div>
      <div className='ProfileMenu-content MainContent-menu-section'>
        <div className='MainContent-menu-section-title'>
          {t('main.profile.menu.section.conversations')}
        </div>
      </div>
    </div>
  )
}

/* PROFILE MENU FRIENDS */

interface ProfileMenuFriendsProps {}

const ProfileFriendsMenu = (props: ProfileMenuFriendsProps) => {
  const { t } = useTranslation()

  const dispatch = useDispatcher()

  const userId = useSelector(authUserSelector)
  const friendshipsData = useSelector(restUserFriendshipsDataSelector(userId))
  const friendshipsStatus = useSelector(restUserFriendshipsStatusSelector(userId))

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

  const friendshipData = useSelector(restFriendshipDataSelector(props.id))
  const friendshipStatus = useSelector(restFriendshipStatusSelector(props.id))

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

  const userData = useSelector(restUserDataSelector(props.id))
  const userStatus = useSelector(restUserStatusSelector(props.id))

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

export default Profile
