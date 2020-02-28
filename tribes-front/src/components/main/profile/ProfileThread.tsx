import React from 'react'

import {
  useDispatcher,
  useEffect,
  useSelector,
  useParams,
  useTranslation,
} from '../../../utils/hooks'

import { selectors as AuthSelectors } from '../../../store/auth'
import { selectors as MessagesSelectors } from '../../../store/rest/messages'
import { selectors as ThreadsSelectors } from '../../../store/rest/threads'
import { selectors as UsersSelectors } from '../../../store/rest/users'

import {
  RequestState,
  UserStatus,
} from '../../../utils/constants'

import RestService from '../../../services/RestService'

import './ProfileThread.scss'

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

  useEffect(() => {
    if (threadStatus === RequestState.NEVER) {
      RestService.rest.threads.get(dispatch, threadId)
    }
  })

  switch (threadStatus) {
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
        <div className='ProfileThread'>
          Thread trololo
          <ProfileThreadMessages />
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

/* PROFILE THREAD MESSAGES */

interface ProfileThreadMessagesProps {
}

const ProfileThreadMessages = (props: ProfileThreadMessagesProps) => {
  const { threadId } = useParams<ThreadRouteParamTypes>()

  const dispatch = useDispatcher()

  const messagesData = useSelector(ThreadsSelectors.restThreadMessagesDataSelector(threadId))
  const messagesStatus = useSelector(ThreadsSelectors.restThreadMessagesStatusSelector(threadId))

  useEffect(() => {
    if (messagesStatus === RequestState.NEVER) {
      RestService.rest.threads.messages.getAll(dispatch, threadId)
    }
  })

  switch (messagesStatus) {
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
          className={`ProfileThreadMessages`}
        >
          {messagesData.map((id: string) => (<ProfileThreadMessage key={id} id={id} />))}
        </div>
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div>
          Error ProfileThreadMessages
        </div>
      )
    }
  }
}

/* PROFILE THREAD MESSAGE */

interface ProfileThreadMessageProps {
  id: string
}

const ProfileThreadMessage = (props: ProfileThreadMessageProps) => {
  const dispatch = useDispatcher()

  const currentUserId = useSelector(AuthSelectors.authUserSelector)

  const currentUser = useSelector(UsersSelectors.restUserDataSelector(currentUserId))

  const messageData = useSelector(MessagesSelectors.restMessageDataSelector(props.id))
  const messageStatus = useSelector(MessagesSelectors.restMessageStatusSelector(props.id))

  useEffect(() => {
    if (messageStatus === RequestState.NEVER) {
      RestService.rest.messages.get(dispatch, props.id)
    }
  })

  switch (messageStatus) {
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
        <ProfileThreadMessageText
          id={props.id}
        />
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div>
          Error ProfileThreadMessage
        </div>
      )
    }
  }
}

/* PROFILE THREAD MESSAGE */

interface ProfileThreadMessageTextProps {
  id: string
}

const ProfileThreadMessageText = (props: ProfileThreadMessageTextProps) => {
  const dispatch = useDispatcher()

  const currentUserId = useSelector(AuthSelectors.authUserSelector)

  const messageData = useSelector(MessagesSelectors.restMessageDataSelector(props.id))

  const userData = useSelector(UsersSelectors.restUserDataSelector(messageData.userId))
  const userStatus = useSelector(UsersSelectors.restUserStatusSelector(messageData.userId))

  useEffect(() => {
    if (userStatus === RequestState.NEVER) {
      RestService.rest.users.get(dispatch, messageData.userId)
    }
  })

  switch (userStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <div>
          Loading ProfileThreadMessageText...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      let className = 'ProfileThreadMessage '
      if (currentUserId === messageData.userId) {
        className += 'ProfileThreadMessage-currentUser'
      } else {
        className += 'ProfileThreadMessage-otherUser'
      }

      return (
        <div
          className={className}
        >
          {userData.name} - {messageData.text}
        </div>
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div>
          Error ProfileThreadMessageText
        </div>
      )
    }
  }
}

export default ProfileThread