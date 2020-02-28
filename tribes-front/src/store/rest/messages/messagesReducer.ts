import { Reducer } from 'redux'

import { ActionsTypes as MessagesActionsTypes} from './messagesActions'
import { ActionsTypes as AuthActionsTypes } from '../../auth/authActions'
import { ActionsTypes as ThreadsActionsTypes } from '../threads/threadsActions'

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

const reducer: Reducer<MessagesState> = (state = initialState, action) => {
  switch (action.type) {

    // GET /messages/{messageId}

    case MessagesActionsTypes.REST_MESSAGES_GET_FETCH: {
      const { id } = action.payload

      const messageState = getMessageState(state, id)
      messageState.error = null
      messageState.status = RequestState.FETCHING

      return { ...state }
    }
    case MessagesActionsTypes.REST_MESSAGES_GET_SUCCESS: {
      const { id, message } = action.payload

      const messageState = getMessageState(state, id)
      messageState.data = message
      messageState.error = null
      messageState.status = RequestState.SUCCESS

      return { ...state }
    }
    case MessagesActionsTypes.REST_MESSAGES_GET_FAILURE: {
      const { id, error } = action.payload

      const messageState = getMessageState(state, id)
      messageState.data = null
      messageState.error = error
      messageState.status = RequestState.FAILURE

      return { ...state }
    }

    // GET /threads/{threadId}/messages

    case ThreadsActionsTypes.REST_THREADS_MESSAGES_GETALL_SUCCESS: {
      const { messages } = action.payload

      messages.forEach((message: MessageData) => {
        state.data[message.id] = {
          data: message,
          status: RequestState.SUCCESS,
          error: null,
        }
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