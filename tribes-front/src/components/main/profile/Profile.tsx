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
  restUserFriendshipsDataSelector,
  restUserFriendshipsStatusSelector,
  restUserFriendshipsErrorSelector,
} from '../../../store/rest/users/selectors'

import {
  RequestState,
} from '../../../utils/constants'

import RestService from '../../../services/RestService'


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
      <ProfileFriendsMenu />
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

  return (
    <div className='ProfileMenu-content MainContent-menu-section'>
      <div className='MainContent-menu-section-title'>
        {t('main.profile.menu.section.friends')}
      </div>
    </div>
  )
}

export default Profile
