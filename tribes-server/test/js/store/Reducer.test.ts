import reducer from '../../../src/store/reducer'

import { initialState as sessionsInitialState } from '../../../src/store/sessions/sessionsReducer'

import { initialState as messagesInitialState } from '../../../src/store/data/messages/messagesReducer'
import { initialState as threadsInitialState } from '../../../src/store/data/threads/threadsReducer'
import { initialState as tribesInitialState } from '../../../src/store/data/tribes/tribesReducer'
import { initialState as usersInitialState } from '../../../src/store/data/users/usersReducer'

describe('Reducer', () => {
  describe('default action', () => {
    test('When receiving an unsupported action', () => {
      const paramState = undefined
      const paramAction = { type: 'UNKNOWN' }

      const result = reducer(paramState, paramAction)

      const expected = {
        sessions: sessionsInitialState(),
        data: {
          messages: messagesInitialState(),
          threads: threadsInitialState(),
          tribes: tribesInitialState(),
          users: usersInitialState(),
        }
      }

      expect(result).toEqual(expected)
    })
  })
})
