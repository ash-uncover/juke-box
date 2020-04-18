import {
  useEffect as useEffectBase,
  useRef as useRefBase,
  useState as useStateBase,
} from 'react'

import {
  useParams as useParamsBase,
  useRouteMatch as useRouteMatchBase,
} from 'react-router-dom'

import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'

import {
  useTranslation as useTranslationBase,
} from 'react-i18next'

import { selectors as MessagesSelectors } from '../store/rest/messages'
import { selectors as ThreadsSelectors } from '../store/rest/threads'
import { selectors as UsersSelectors } from '../store/rest/users'

import RestService from '../services/RestService'
import SocketService from '../services/SocketService'

import {
  RequestState,
} from '../utils/constants'

export const useEffect = useEffectBase
export const useRef = useRefBase
export const useState = useStateBase
export const useParams = useParamsBase
export const useRouteMatch = useRouteMatchBase
export const useDispatch = useDispatchBase
export const useSelector = useSelectorBase
export const useTranslation = useTranslationBase

export const useDispatcher = () => {
  const dispatch = useDispatchBase()
  return (arg: any) => {
    try {
      SocketService.send(dispatch, arg)
    } catch (error) {
      SocketService.close(dispatch)
    }
    return dispatch(arg)
  }
}

// Loads a thread if needed
export const useThread = (threadId: string) => {
  const dispatch = useDispatcher()
  const status = useSelector(ThreadsSelectors.restThreadStatusSelector(threadId))
  useEffect(() => {
    if (status === RequestState.NEVER || status === RequestState.OUTDATED) {
      RestService.rest.threads.get(dispatch, threadId)
    }
  })
  return status
}

// Loads a thread's messages if needed
export const useThreadMessages = (threadId: string) => {
  const dispatch = useDispatcher()
  const status = useSelector(ThreadsSelectors.restThreadMessagesStatusSelector(threadId))
  useEffect(() => {
    if (status === RequestState.NEVER || status === RequestState.OUTDATED) {
      RestService.rest.threads.messages.getAll(dispatch, threadId)
    }
  })
  return status
}

// Loads a message if needed
export const useMessage = (messageId: string) => {
  const dispatch = useDispatcher()
  const status = useSelector(MessagesSelectors.restMessageStatusSelector(messageId))
  useEffect(() => {
    if (status === RequestState.NEVER || status === RequestState.OUTDATED) {
      RestService.rest.messages.get(dispatch, messageId)
    }
  })
  return status
}

// Loads a user if needed
export const useUser = (userId: string) => {
  const dispatch = useDispatcher()
  const status = useSelector(UsersSelectors.restUserStatusSelector(userId))
  useEffect(() => {
    if (status === RequestState.NEVER || status === RequestState.OUTDATED) {
      RestService.rest.users.get(dispatch, userId)
    }
  })
  return status
}


const hooks = {
  useMessage,
  useThread,
  useThreadMessages,
  useUser,
}

export default hooks