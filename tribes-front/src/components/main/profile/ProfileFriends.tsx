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

import Tile from '../../commons/Tile'

import './ProfileFriends.scss'

/* PROFILE */

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
      return (
        <div
          className={`ProfileFriendships`}
        >
          {friendshipsData.map((id: string) => (<ProfileFriendship key={id} id={id} />))}
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
        <Tile
          className={`ProfileFriend`}
          name={userData.name}
          image={userData.image}
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

export default ProfileFriendships