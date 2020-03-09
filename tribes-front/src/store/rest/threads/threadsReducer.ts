import { Reducer } from 'redux'
import produce from 'immer'

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

const reducer: Reducer<ThreadsState> = (baseState = initialState, action) => {
  switch (action.type) {

    // GET /threads/{threadId}

    case ThreadsActionsTypes.REST_THREADS_GET_FETCH: {
      const { id } = action.payload

      return produce(baseState, (state) => {
        const threadState = getThreadState(state, id)
        threadState.error = null
        threadState.status = RequestState.FETCHING
      })
    }
    case ThreadsActionsTypes.REST_THREADS_GET_SUCCESS: {
      const { id, thread } = action.payload

      return produce(baseState, (state) => {
        const threadState = getThreadState(state, id)
        threadState.data = thread
        threadState.error = null
        threadState.status = RequestState.SUCCESS
      })
    }
    case ThreadsActionsTypes.REST_THREADS_GET_FAILURE: {
      const { id, error } = action.payload

      return produce(baseState, (state) => {
        const threadState = getThreadState(state, id)
        threadState.data = null
        threadState.error = error
        threadState.status = RequestState.FAILURE
      })
    }

    // GET /threads/{threadId}/messages

    case ThreadsActionsTypes.REST_THREADS_MESSAGES_GETALL_FETCH: {
      const { id } = action.payload

      return produce(baseState, (state) => {
        const threadState = getThreadState(state, id)
        threadState.messagesError = null
        threadState.messagesStatus = threadState.messagesStatus === RequestState.NEVER ? RequestState.FETCHING_FIRST : RequestState.FETCHING
      })
    }
    case ThreadsActionsTypes.REST_THREADS_MESSAGES_GETALL_SUCCESS: {
      const { id, messages } = action.payload

      return produce(baseState, (state) => {
        const threadState = getThreadState(state, id)
        threadState.messagesData = messages.map((message: MessageData) => message.id)
        threadState.messagesError = null
        threadState.messagesStatus = RequestState.SUCCESS
      })
    }
    case ThreadsActionsTypes.REST_THREADS_MESSAGES_GETALL_FAILURE: {
      const { id, error } = action.payload

      return produce(baseState, (state) => {
        const threadState = getThreadState(baseState, id)
        threadState.messagesData = null
        threadState.messagesError = error
        threadState.messagesStatus = RequestState.FAILURE
      })
    }

    // GET /users/{userId}/threads

    case UsersActionsTypes.REST_USERS_THREADS_GETALL_SUCCESS: {
      const { threads } = action.payload

      return produce(baseState, (state) => {
        threads.forEach((thread: ThreadData) => {
          getThreadState(state, thread.id)
        })
      })
    }

    // SOCKET events

    case SocketActionsTypes.SERVER_THREAD_MESSAGE_POSTED: {
      const { threadId } = action.payload

      return produce(baseState, (state) => {
        state.data[threadId].messagesStatus = RequestState.OUTDATED
      })
    }

    case SocketActionsTypes.SERVER_THREAD_MESSAGE_DELETED: {
      const { threadId, id } = action.payload.message

      return produce(baseState, (state) => {
        const messages = state.data[threadId].messagesData.slice()
        const index = messages.indexOf(id)
        messages.splice(index, 1)

        state.data[threadId].messagesData = messages
      })
    }

    // DELETE /auth

    case AuthActionsTypes.AUTH_DELETE_SUCCESS: {
      return getInitialState()
    }

    default: {
      return baseState
    }
  }
}

export default reducer