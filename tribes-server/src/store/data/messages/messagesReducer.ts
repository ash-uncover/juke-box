import { Reducer } from 'redux'
import produce from 'immer'

import {
  ActionsTypes as MessagesActionsTypes
} from './messagesActions'

import {
  ActionsTypes as SessionsActionsTypes
} from '../../sessions/sessionsActions'

import {
  selectors as SessionsSelectors
} from '../../sessions'

import {
  add,
  remove,
} from '../../../utils/Sets'

export interface MessagesState {
}

export const initialState: () => MessagesState = () => ({})

const getMessageState = (state: MessagesState, id: string) => {
  if (!state[id]) {
    state[id] = []
  }
  return state[id]
}

const MessagesReducer = (
  baseState = initialState(),
  action,
  rootState: any
) => {
  switch (action.type) {

    case MessagesActionsTypes.REST_MESSAGES_GET_SUCCESS: {
      const { session, id } = action.payload

      return produce(baseState, (state) => {
        const MessageState = getMessageState(state, id)
        add(MessageState, session.userId)
      })
    }

    case MessagesActionsTypes.REST_MESSAGES_DELETE_SUCCESS: {
      const { id } = action.payload

      return produce(baseState, (state) => {
        delete state[id]
      })
    }

    case SessionsActionsTypes.AUTH_DELETE_SUCCESS: {
      const { id, userId } = action.payload.session

      return produce(baseState, (state) => {
        const isLastSession = SessionsSelectors.isLastSession(rootState, userId, id)
        if (isLastSession) {
          Object.values(state).forEach((listeners: string[]) => {
            remove(listeners, userId)
          })
        }
      })
    }


    default: {
      return baseState
    }
  }
}

export default MessagesReducer