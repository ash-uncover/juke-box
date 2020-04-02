import produce from 'immer'

import { ActionsTypes as SessionActionsTypes } from './sessionsActions'

export interface SessionState {}

export const initialState: () => SessionState = () => ({})


export const initialSessionState = (id: string) => ({
  id,
  isAlive: true,
  userId: null
})

const getSessionState = (state: SessionState, id: string) => {
  if (!state[id]) {
    state[id] = initialSessionState(id)
  }
  return state[id]
}

const SessionsReducer: (baseState: SessionState, action: any) => SessionState = (
  baseState: SessionState = initialState(),
  action: any
) => {

  switch (action.type) {
    case SessionActionsTypes.SESSION_CONNECT_SUCCESS: {
      const { session } = action.payload

      return produce(baseState, (state) => {
        getSessionState(state, session.id)
      })
    }

    case SessionActionsTypes.SESSION_CHECK_FETCH: {
      const { session } = action.payload

      return produce(baseState, (state) => {
        getSessionState(state, session.id).isAlive = false
      })
    }

    case SessionActionsTypes.SESSION_CHECK_SUCCESS: {
      const { session } = action.payload

      return produce(baseState, (state) => {
        getSessionState(state, session.id).isAlive = true
      })
    }

    case SessionActionsTypes.SESSION_CLOSE_SUCCESS: {
      const { session } = action.payload

      return produce(baseState, (state) => {
        delete state[session.id]
      })
    }

    case SessionActionsTypes.AUTH_GET_SUCCESS: {
      const { session, user } = action.payload

      return produce(baseState, (state) => {
        const sessionState = getSessionState(state, session.id)
        sessionState.userId = user.id
      })
    }

    case SessionActionsTypes.AUTH_DELETE_SUCCESS: {
      const { session } = action.payload

      return produce(baseState, (state) => {
        const sessionState = getSessionState(state, session.id)
        sessionState.userId = null
      })
    }

    default: {
      return baseState
    }
  }
}

export default SessionsReducer