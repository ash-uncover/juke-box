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
      }, 1000)
    },

    delete: (dispatch: any, token: string) => {
      dispatch(AuthActions.authDeleteFetch(token))
      setTimeout(() => {
        dispatch(AuthActions.authDeleteSuccess())
      }, 1000)
    }
  }
}

export default RestService