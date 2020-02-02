import { Actions as AuthActions } from '../store/auth/actions'

const RestService = {
  auth: {
    get: (dispatch: any, username: string, password: string) => {
      dispatch(AuthActions.authGetFetch(username, password))
      setTimeout(() => {
        if (username === 'a' && password === 'a') {
          dispatch(AuthActions.authGetSuccess('tokenOk'))
        } else {
          dispatch(AuthActions.authGetFailure('errorAuth'))
        }
      }, 1500)
    }
  }
}

export default RestService