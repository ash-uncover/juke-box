import { Reducer } from 'redux'
import produce from 'immer'

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

export interface ThreadsState {
}

export const initialState: () => ThreadsState = () => ({})

const getThreadState = (state: ThreadsState, id: string) => {
  if (!state[id]) {
    state[id] = []
  }
  return state[id]
}

const ThreadsReducer: Reducer<ThreadsState> = (baseState = initialState(), action) => {
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

    default: {
      return baseState
    }
  }
}

export default ThreadsReducer