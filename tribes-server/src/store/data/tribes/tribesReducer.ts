import { Reducer } from 'redux'
import produce from 'immer'

import {
  ActionsTypes as TribesActionsTypes
} from './tribesActions'

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

const TribesReducer: Reducer<TribesState> = (baseState = initialState(), action) => {
  switch (action.type) {

    case TribesActionsTypes.REST_TRIBES_GET_SUCCESS: {
      const { session, id } = action.payload

      return produce(baseState, (state) => {
        const TribeState = getTribeState(state, id)
        add(TribeState, session.userId)
      })
    }

    default: {
      return baseState
    }
  }
}

export default TribesReducer