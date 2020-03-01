import React from 'react'

import {
  useState,
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignInAlt,
  faBackspace,
  faPaperPlane,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons'

import {
  Button
} from '../../commons'

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
    if (threadStatus === RequestState.NEVER || threadStatus === RequestState.OUTDATED) {
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
          <div className='ProfileThread-header'>
            Thread trololo
          </div>
          <ProfileThreadMessages />
          <ProfileThreadInput />
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
    if (messagesStatus === RequestState.NEVER || messagesStatus === RequestState.OUTDATED) {
      RestService.rest.threads.messages.getAll(dispatch, threadId)
    }
  })

  switch (messagesStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING_FIRST: {
      return (
        <div
          className={`ProfileThreadMessages`}
        >
          <ProfileThreadStart />
          Loading...
        </div>
      )
    }
    case RequestState.FETCHING:
    case RequestState.OUTDATED:
    case RequestState.SUCCESS: {
      return (
        <div
          className={`ProfileThreadMessages`}
        >
          <ProfileThreadStart />
          {messagesData.map((id: string) => (<ProfileThreadMessage key={id} id={id} />))}
        </div>
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div
          className={`ProfileThreadMessages`}
        >
          <ProfileThreadStart />
          Error ProfileThreadMessages
        </div>
      )
    }
  }
}

/* PROFILE THREAD START */

interface ProfileThreadStartProps {
}

const ProfileThreadStart = (props: ProfileThreadStartProps) => {
  const { threadId } = useParams<ThreadRouteParamTypes>()
  const {t } = useTranslation()
  const messagesData = useSelector(ThreadsSelectors.restThreadMessagesDataSelector(threadId))

  return (
    <div
      className={`ProfileThreadStart`}
    >
      {t('thread.start')}
      <img
        className={`ProfileThreadStart-image`}
        src='/logo-big-grey.png'
      />
    </div>
  )
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

/* PROFILE THREAD MESSAGE TEXT */

interface ProfileThreadMessageTextProps {
  id: string
}

const ProfileThreadMessageText = (props: ProfileThreadMessageTextProps) => {
  const dispatch = useDispatcher()
  const { t } = useTranslation()
  const currentUserId = useSelector(AuthSelectors.authUserSelector)

  const messageData = useSelector(MessagesSelectors.restMessageDataSelector(props.id))

  const userData = useSelector(UsersSelectors.restUserDataSelector(messageData.userId))
  const userStatus = useSelector(UsersSelectors.restUserStatusSelector(messageData.userId))

  useEffect(() => {
    if (userStatus === RequestState.NEVER) {
      RestService.rest.users.get(dispatch, messageData.userId)
    }
  })

  const onEditMessage = () => {

  }

  const onDeleteMessage = () => {
    RestService.rest.messages.delete(dispatch, messageData)
  }

  let className = 'ProfileThreadMessageText '

  switch (userStatus) {
    case RequestState.NEVER:
    case RequestState.FETCHING: {
      return (
        <div className={className}>
          Loading ProfileThreadMessageText...
        </div>
      )
    }
    case RequestState.SUCCESS: {
      const actions = []
      if (currentUserId === messageData.userId) {
        className += 'ProfileThreadMessageText-currentUser'
        actions.push({
          title: t('message.edit'),
          onClick: onEditMessage,
          icon: faEdit,
        })
        actions.push({
          title: t('message.delete'),
          onClick: onDeleteMessage,
          icon: faTrashAlt,
        })
      } else {
        className += 'ProfileThreadMessageText-otherUser'
      }
      const date = new Date(messageData.date)
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return (
        <div className={className}>
          <div className={`ProfileThreadMessageText-time`}>
            {`${hours}:${minutes}`}
          </div>
          <div className={`ProfileThreadMessageText-separator`} />
          <div className={`ProfileThreadMessageText-user`}>
            {userData.name}
          </div>
          <div className={`ProfileThreadMessageText-separator`} />
          <div className={`ProfileThreadMessageText-separator`} />
          <div className={`ProfileThreadMessageText-text`}>
            {messageData.text}
          </div>
          { actions.length &&
            <div className={`ProfileThreadMessageText-actions`}>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  className={`ProfileThreadMessageText-action`}
                  title={action.title}
                  onClick={action.onClick}
                  icon={action.icon}
                  color={'white'}
                  size='1x'
                />
              ))}
            </div>
          }
        </div>
      )
    }
    case RequestState.FAILURE:
    default: {
      return (
        <div className={className}>
          Error ProfileThreadMessageText
        </div>
      )
    }
  }
}


/* PROFILE THREAD INPUT */

interface ProfileThreadInputProps {}

const ProfileThreadInput = (props: ProfileThreadInputProps) => {
  const dispatch = useDispatcher()
  const { t } = useTranslation()

  const { threadId } = useParams<ThreadRouteParamTypes>()
  const userId = useSelector(AuthSelectors.authUserSelector)

  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  const onSendMessage = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setSending(true)
    RestService.rest.messages.post(
      dispatch,
      {
        threadId,
        userId,
        text,
        date: Date.now().toString()
      }
    )
      .then(() => {
        setText('')
      })
      .finally(() => {
        setSending(false)
      })
  }

  return (
    <form
      className={`ProfileThreadInput`}
    >
      <input
        className={`ProfileThreadInput-input`}
        value={text}
        type='text'
        disabled={sending}
        placeholder={t('placeholder')}
        onChange={(event) => setText(event.target.value)}
      />
      <Button
        className={`ProfileThreadInput-action`}
        type='reset'
        title={t('message.clear')}
        onClick={() => setText('')}
        icon={faBackspace}
        color={'white'}
        size='1x'
      />
      <Button
        className={`ProfileThreadInput-action`}
        type='submit'
        title={t('message.send')}
        onClick={onSendMessage}
        icon={faPaperPlane}
        color={'white'}
        size='1x'
      />
    </form>
  )
}

export default ProfileThread
