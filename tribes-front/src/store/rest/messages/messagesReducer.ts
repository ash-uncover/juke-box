import { Reducer } from 'redux'
import produce from 'immer'

import { ActionsTypes as MessagesActionsTypes} from './messagesActions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/authActions'
import { ActionsTypes as ThreadsActionsTypes } from '../threads/threadsActions'
import { ActionsTypes as ServerActionsTypes } from '../../socket/socketActions'

import {
  ErrorData,
  MessageData,
} from '../../../types'

import { RequestState } from '../../../utils/constants'

export interface MessagesState {
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

export interface MessageState {
  data: MessageData | null,
  status: RequestState,
  error: ErrorData | null,
}

export const initialMessageState = () => ({
  data: null,
  status: RequestState.NEVER,
  error: null,
})

const getMessageState = (state: MessagesState, id: string) => {
  if (!state.data[id]) {
    state.data[id] = initialMessageState()
  }
  return state.data[id]
}

const reducer: Reducer<MessagesState> = (baseState = initialState, action) => {
  switch (action.type) {

    // GET /messages/{messageId}

    case MessagesActionsTypes.REST_MESSAGES_GET_FETCH: {
      const { id } = action.payload

      return produce(baseState, (state) => {
        const messageState = getMessageState(state, id)
        messageState.error = null
        messageState.status = messageState.status === RequestState.NEVER ? RequestState.FETCHING_FIRST : RequestState.FETCHING
      })
    }
    case MessagesActionsTypes.REST_MESSAGES_GET_SUCCESS: {
      const { id, message } = action.payload

      return produce(baseState, (state) => {
        const messageState = getMessageState(state, id)
        messageState.data = message
        messageState.error = null
        messageState.status = RequestState.SUCCESS
      })
    }
    case MessagesActionsTypes.REST_MESSAGES_GET_FAILURE: {
      const { id, error } = action.payload

      return produce(baseState, (state) => {
        const messageState = getMessageState(state, id)
        messageState.data = null
        messageState.error = error
        messageState.status = RequestState.FAILURE
      })
    }

    // PUT /messages/{messageId}
    // PATCH /messages/{messageId}

    case ServerActionsTypes.SERVER_THREAD_MESSAGE_UPDATED: {
      const { message } = action.payload

      return produce(baseState, (state) => {
        const messageState = getMessageState(state, message.id)
        messageState.status = RequestState.OUTDATED
      })
    }

    // DELETE /messages/{messageId}

    case ServerActionsTypes.SERVER_THREAD_MESSAGE_DELETED: {
      const { message } = action.payload

      return produce(baseState, (state) => {
        delete state.data[message.id]
      })
    }

    // GET /threads/{threadId}/messages

    case ThreadsActionsTypes.REST_THREADS_MESSAGES_GETALL_SUCCESS: {
      const { messages } = action.payload

      return produce(baseState, (state) => {
        messages.forEach((message: MessageData) => {
          state.data[message.id] = {
            data: message,
            status: RequestState.SUCCESS,
            error: null,
          }
        })
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