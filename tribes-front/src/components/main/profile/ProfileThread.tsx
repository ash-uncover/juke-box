import React from 'react'

import {
  useDispatcher,
  useEffect,
  useSelector,
  useParams,
  useTranslation,
} from '../../../utils/hooks'

import { selectors as AuthSelectors } from '../../../store/auth'
import { selectors as ThreadsSelectors } from '../../../store/rest/threads'

import {
  RequestState,
  UserStatus,
} from '../../../utils/constants'

import RestService from '../../../services/RestService'

import './Profile.scss'

interface ThreadRouteParamTypes {
  threadId: string
}

/* PROFILE THREAD */

interface ProfileThreadProps {
}

const ProfileThread = (props: ProfileThreadProps) => {
  const { threadId } = useParams<ThreadRouteParamTypes>()

  const dispatch = useDispatcher()

  const threadData = useSelector(ThreadsSelectors.restThreadDataSelector(threadId))
  const threadStatus = useSelector(ThreadsSelectors.restThreadStatusSelector(threadId))

  const messagesData = useSelector(ThreadsSelectors.restThreadDataSelector(threadId))
  const messagesStatus = useSelector(ThreadsSelectors.restThreadStatusSelector(threadId))

  useEffect(() => {
    if (threadStatus === RequestState.NEVER) {
      RestService.rest.threads.get(dispatch, threadId)
    }
    if (messagesStatus === RequestState.NEVER) {
      RestService.rest.threads.messages.getAll(dispatch, threadId)
    }
  })

  return (
    <div className='ProfileThread'>
      Coucou
    </div>
  )
}

export default ProfileThread