import { Reducer } from 'redux'
import produce from 'immer'

import {
  ActionsTypes as TribesActionsTypes
} from './tribesActions'

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

export interface TribesState {
}

export const initialState: () => TribesState = () => ({})

const getTribeState = (state: TribesState, id: string) => {
  if (!state[id]) {
    state[id] = []
  }
  return state[id]
}

const TribesReducer = (
  baseState = initialState(),
  action,
  rootState
) => {
  switch (action.type) {

    case TribesActionsTypes.REST_TRIBES_GET_SUCCESS: {
      const { session, id } = action.payload

      return produce(baseState, (state) => {
        const TribeState = getTribeState(state, id)
        add(TribeState, session.userId)
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

export default TribesReducer