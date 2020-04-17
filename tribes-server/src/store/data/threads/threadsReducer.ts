import { Reducer } from 'redux'
import produce from 'immer'

import {
  ActionsTypes as SessionsActionsTypes
} from '../../sessions/sessionsActions'

import {
  selectors as SessionsSelectors
} from '../../sessions'

import {
  ActionsTypes as MessagesActionsTypes
} from '../messages/messagesActions'

import {
  ActionsTypes as ThreadsActionsTypes
} from './threadsActions'

import {
  add,
  remove,
} from '../../../utils/Sets'
import { Session } from 'inspector'

export interface ThreadsState {
}

export const initialState: () => ThreadsState = () => ({})

const getThreadState = (state: ThreadsState, id: string) => {
  if (!state[id]) {
    state[id] = []
  }
  return state[id]
}

const ThreadsReducer = (
  baseState = initialState(),
  action,
  rootState
) => {
  switch (action.type) {

    case ThreadsActionsTypes.REST_THREADS_GET_SUCCESS: {
      const { session, id } = action.payload

      return produce(baseState, (state) => {
        const threadState = getThreadState(state, id)
        add(threadState, session.userId)
      })
    }

    case ThreadsActionsTypes.REST_THREADS_DELETE_SUCCESS: {
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

export default ThreadsReducer