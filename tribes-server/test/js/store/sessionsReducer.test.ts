import {
  ActionsTypes as SessionsActionsTypes,
} from '../../../src/store/sessions/sessionsActions'

import SessionsReducer, {
  initialState,
} from '../../../src/store/sessions/sessionsReducer'

describe('sessionsReducer', () => {
  describe('default action', () => {
    test('When receiving an unsupported action', () => {
      const paramState = undefined
      const paramAction = { type: 'UNKNOWN' }

      const result = SessionsReducer(paramState, paramAction)

      const expected = initialState()

      expect(result).toEqual(expected)
    })
  })

  describe('When receiving socket connection success event', () => {
    test('when session was not defined', () => {
      const paramState = initialState()
      const paramAction = {
        type: SessionsActionsTypes.SESSION_CONNECT_SUCCESS,
        payload: {
          session: { id: 'sessionId' },
        }
      }

      const result = SessionsReducer(paramState, paramAction)

      const expected = {
        sessionId: {
          id: paramAction.payload.session.id,
          isAlive: true,
          userId: null,
        }
      }

      expect(result).toEqual(expected)
    })
  })

  describe('When receiving user authentication success event', () => {
    test('when session was properly defined', () => {
      const paramState = {
        sessionId: {
          id: 'sessionId',
          userId: null,
        },
        sessionId2: {
          id: 'sessionId2',
          userId: null,
        },
      }

      const paramAction = {
        type: SessionsActionsTypes.AUTH_GET_SUCCESS,
        payload: {
          session: { id: 'sessionId' },
          user: { id: 'userId' },
        }
      }

      const result = SessionsReducer(paramState, paramAction)

      const expected = {
        sessionId: {
          id: 'sessionId',
          userId: 'userId',
        },
        sessionId2: {
          id: 'sessionId2',
          userId: null,
        },
      }

      expect(result).toEqual(expected)
    })
  })

  describe('When receiving user disconnetion success event', () => {
    test('when session was properly defined', () => {
      const paramState = {
        sessionId: {
          id: 'sessionId',
          userId: 'userId',
        },
        sessionId2: {
          id: 'sessionId2',
          userId: null,
        },
      }

      const paramAction = {
        type: SessionsActionsTypes.AUTH_DELETE_SUCCESS,
        payload: {
          session: { id: 'sessionId' },
          user: { id: 'userId' },
        },
      }

      const result = SessionsReducer(paramState, paramAction)

      const expected = {
        sessionId: {
          id: 'sessionId',
          userId: null,
        },
        sessionId2: {
          id: 'sessionId2',
          userId: null,
        },
      }

      expect(result).toEqual(expected)
    })
  })

})
