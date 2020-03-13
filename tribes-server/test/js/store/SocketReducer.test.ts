import {
  ActionsTypes as SessionActionsTypes,
} from '../../../src/store/socket/socketActions'

import {
  ActionsTypes as UserActionsTypes
} from '../../../src/store/users/userActions'

import SocketReducer, {
  initialState,
} from '../../../src/store/socket/socketReducer'

describe('SessionReducer', () => {
  describe('default action', () => {
    test('When receiving an unsupported action', () => {
      const paramState = null
      const paramAction = { type: 'UNKNOWN' }

      const result = SocketReducer(paramState, paramAction)

      const expected = initialState()

      expect(result).toEqual(expected)
    })
  })

  describe('When receiving socket connection success event', () => {
    test('when session was not defined', () => {
      const paramState = initialState()
      const paramAction = {
        type: SessionActionsTypes.SOCKET_CONNECT_SUCCESS,
        payload: {
          session: { id: 'sessionId' },
        }
      }

      const result = SocketReducer(paramState, paramAction)

      const expected = {
        sessionId: {
          id: paramAction.payload.session.id,
          userId: null
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
        type: UserActionsTypes.AUTH_GET_SUCCESS,
        payload: {
          session: { id: 'sessionId' },
          user: { id: 'userId' },
        }
      }

      const result = SocketReducer(paramState, paramAction)

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
        type: UserActionsTypes.AUTH_DELETE_SUCCESS,
        payload: {
          session: { id: 'sessionId' },
          user: { id: 'userId' },
        },
      }

      const result = SocketReducer(paramState, paramAction)

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
