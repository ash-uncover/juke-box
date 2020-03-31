import {
  ActionsTypes as UserActionsTypes
} from '../../../src/store/users/usersActions'

import UserReducer, {
  initialState,
} from '../../../src/store/users/usersReducer'

describe('UserReducer', () => {
  describe('default action', () => {
    test('When receiving an unsupported action', () => {
      const paramState = undefined
      const paramAction = { type: 'UNKNOWN' }

      const result = UserReducer(paramState, paramAction)

      const expected = initialState()

      expect(result).toEqual(expected)
    })
  })

  describe('When receiving user authentication success event', () => {
    test('properly creates the user entry with the session', () => {
      const paramState = {}

      const paramAction = {
        type: UserActionsTypes.AUTH_GET_SUCCESS,
        payload: {
          session: { id: 'sessionId' },
          user: { id: 'userId' },
        }
      }

      const result = UserReducer(paramState, paramAction)

      const expected = {
        userId: {
          listeners: [],
          sessions: ['sessionId'],
        },
      }

      expect(result).toEqual(expected)
    })
  })

  describe('When receiving user disconnetion success event', () => {
    test('properly removed only the sessions and only to the user', () => {
      const paramState = {
        userId: {
          listeners: [],
          sessions: ['sessionId', 'sessionId2'],
        },
        userId2: {
          listeners: [],
          sessions: ['sessionId'],
        },
      }

      const paramAction = {
        type: UserActionsTypes.AUTH_DELETE_SUCCESS,
        payload: {
          session: { id: 'sessionId' },
          user: { id: 'userId' },
        },
      }

      const result = UserReducer(paramState, paramAction)

      const expected = {
        userId: {
          listeners: [],
          sessions: ['sessionId2'],
        },
        userId2: {
          listeners: [],
          sessions: ['sessionId'],
        },
      }

      expect(result).toEqual(expected)
    })
  })

})
