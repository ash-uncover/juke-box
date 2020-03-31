import reducer from '../../../src/store/reducer'

import {
  initialState as socketInitialState,
} from '../../../src/store/socket/socketReducer'

import {
  initialState as userInitialState,
} from '../../../src/store/users/usersReducer'

describe('Reducer', () => {
  describe('default action', () => {
    test('When receiving an unsupported action', () => {
      const paramState = undefined
      const paramAction = { type: 'UNKNOWN' }

      const result = reducer(paramState, paramAction)

      const expected = {
        socket: socketInitialState(),
        users: userInitialState(),
      }

      expect(result).toEqual(expected)
    })
  })
})
