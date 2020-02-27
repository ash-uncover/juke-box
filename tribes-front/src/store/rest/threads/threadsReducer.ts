import { Reducer } from 'redux'

import { ActionsTypes as ThreadsActionsTypes} from './threadsActions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/authActions'
import { ActionsTypes as UsersActionsTypes } from '../users/usersActions'

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
  membershipsData: null,
  membershipsStatus: RequestState.NEVER,
  membershipsError: null,
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
      threadState.messagesStatus = RequestState.FETCHING

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