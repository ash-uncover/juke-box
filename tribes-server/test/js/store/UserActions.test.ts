import {
  Actions as UserActions
} from '../../../src/store/users/userActions'

describe('UserActions', () => {
  test('authGetSuccess', () => {
    const paramSession = {
      id: 'sessionId',
    }
    const paramUser = {
      id: 'userId',
    }
    const result = UserActions.authGetSuccess(paramSession, paramUser)
    const expected = {
      session: paramSession,
      user: paramUser
    }

    expect(result.payload).toEqual(expected)
  })

  test('authDeleteSuccess', () => {
    const paramSession = {
      id: 'sessionId',
    }
    const paramUser = {
      id: 'userId',
    }
    const result = UserActions.authDeleteSuccess(paramSession, paramUser)
    const expected = {
      session: paramSession,
      user: paramUser
    }

    expect(result.payload).toEqual(expected)
  })
})
