import {
  Actions as SocketActions
} from '../../../src/store/socket/socketActions'

describe('SocketActions', () => {
  test('socketConnectSuccess', () => {
    const paramSession = {
      id: 'sessionId',
      userId: 'userId'
    }
    const result = SocketActions.socketConnectSuccess(paramSession)
    const expected = {
      session: paramSession
    }

    expect(result.payload).toEqual(expected)
  })
})
