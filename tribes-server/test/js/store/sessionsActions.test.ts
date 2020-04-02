import {
  Actions as SessionsActions
} from '../../../src/store/sessions/sessionsActions'

describe('SessionsActions', () => {
  test('sessionConnectSuccess', () => {
    const paramSession = {
      id: 'sessionId',
      userId: 'userId'
    }
    const result = SessionsActions.sessionConnectSuccess(paramSession)
    const expected = {
      session: paramSession
    }

    expect(result.payload).toEqual(expected)
  })
})
