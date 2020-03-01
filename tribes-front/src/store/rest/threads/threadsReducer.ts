import { Reducer } from 'redux'

import { ActionsTypes as ThreadsActionsTypes} from './threadsActions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/authActions'
import { ActionsTypes as UsersActionsTypes } from '../users/usersActions'
import { ActionsTypes as SocketActionsTypes } from '../../socket/socketActions'

import {
  ErrorData,
  MessageData,
  ThreadData,
} from '../../../types'

import { RequestState } from '../../../utils/constants'

export interface ThreadsState {
  data: any,
  status: RequestState,
  error: ErrorData | null,
}

export const getInitialState = () => ({
  data: {},
  status: RequestState.NEVER,
  error: null,
})
const initialState = getInitialState()

export interface ThreadState {
  data: ThreadData | null,
  status: RequestState,
  error: ErrorData | null,
  messagesData: Array<string> | null,
  messagesStatus: RequestState,
  messagesError: ErrorData | null,
}

export const initialThreadState = () => ({
  data: null,
  status: RequestState.NEVER,
  error: null,
  messagesData: null,
  messagesStatus: RequestState.NEVER,
  messagesError: null,
})

const getThreadState = (state: ThreadsState, id: string) => {
  if (!state.data[id]) {
    state.data[id] = initialThreadState()
  }
  return state.data[id]
}

const reducer: Reducer<ThreadsState> = (state = initialState, action) => {
  switch (action.type) {

    // GET /threads/{threadId}

    case ThreadsActionsTypes.REST_THREADS_GET_FETCH: {
      const { id } = action.payload

      const threadState = getThreadState(state, id)
      threadState.error = null
      threadState.status = RequestState.FETCHING

      return { ...state }
    }
    case ThreadsActionsTypes.REST_THREADS_GET_SUCCESS: {
      const { id, thread } = action.payload

      const threadState = getThreadState(state, id)
      threadState.data = thread
      threadState.error = null
      threadState.status = RequestState.SUCCESS

      return { ...state }
    }
    case ThreadsActionsTypes.REST_THREADS_GET_FAILURE: {
      const { id, error } = action.payload

      const threadState = getThreadState(state, id)
      threadState.data = null
      threadState.error = error
      threadState.status = RequestState.FAILURE

      return { ...state }
    }

    // GET /threads/{threadId}/messages

    case ThreadsActionsTypes.REST_THREADS_MESSAGES_GETALL_FETCH: {
      const { id } = action.payload

      const threadState = getThreadState(state, id)
      threadState.messagesError = null
      threadState.messagesStatus = threadState.messagesStatus === RequestState.NEVER ? RequestState.FETCHING_FIRST : RequestState.FETCHING

      return { ...state }
    }
    case ThreadsActionsTypes.REST_THREADS_MESSAGES_GETALL_SUCCESS: {
      const { id, messages } = action.payload

      const threadState = getThreadState(state, id)
      threadState.messagesData = messages.map((message: MessageData) => message.id)
      threadState.messagesError = null
      threadState.messagesStatus = RequestState.SUCCESS

      return { ...state }
    }
    case ThreadsActionsTypes.REST_THREADS_MESSAGES_GETALL_FAILURE: {
      const { id, error } = action.payload

      const threadState = getThreadState(state, id)
      threadState.messagesData = null
      threadState.messagesError = error
      threadState.messagesStatus = RequestState.FAILURE

      return { ...state }
    }

    // GET /users/{userId}/threads

    case UsersActionsTypes.REST_USERS_THREADS_GETALL_SUCCESS: {
      const { threads } = action.payload

      threads.forEach((thread: ThreadData) => {
        getThreadState(state, thread.id)
      })

      return { ...state }
    }

    // SOCKET events

    case SocketActionsTypes.SERVER_THREAD_MESSAGE_POSTED: {
      const { threadId } = action.payload

      state.data[threadId].messagesStatus = RequestState.OUTDATED

      return { ...state }
    }

    case SocketActionsTypes.SERVER_THREAD_MESSAGE_DELETED: {
      const { threadId, id } = action.payload.message

      const messages = state.data[threadId].messagesData.slice()
      const index = messages.indexOf(id)
      messages.splice(index, 1)

      state.data[threadId].messagesData = messages

      return { ...state }
    }

    // DELETE /auth

    case AuthActionsTypes.AUTH_DELETE_SUCCESS: {
      return getInitialState()
    }

    default: {
      return state
    }
  }
}

export default reducer