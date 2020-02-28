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

import './Profile.scss'

/* PROFILE */

interface ProfileThreadProps {}

const ProfileThread = (props: ProfileThreadProps) => {

  return (
    <div className='ProfileThread'>
      Coucou
    </div>
  )
}

export default ProfileThread