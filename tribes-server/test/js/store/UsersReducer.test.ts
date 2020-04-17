import {
  ActionsTypes as UsersActionsTypes
} from '../../../src/store/data/users/usersActions'

import UserReducer, {
  initialState,
} from '../../../src/store/data/users/usersReducer'

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

  describe('When receiving user request success event', () => {
    test('properly creates the user listener with the session user', () => {
      const paramState = {}

      const paramAction = {
        type: UsersActionsTypes.REST_USERS_GET_SUCCESS,
        payload: {
          session: {
            id: 'sessionId',
            userId: 'sessionUserId'
          },
          id: 'userId',
        }
      }

      const result = UserReducer(paramState, paramAction)

      const expected = {
        userId: [ 'sessionUserId' ],
      }

      expect(result).toEqual(expected)
    })
  })
})
