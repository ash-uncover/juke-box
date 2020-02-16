import { action } from 'typesafe-actions'
import { UserData } from '../../../types'

export const ActionsTypes = {
  REST_USERS_GET_FETCH: '@@REST/USERS/GET_FETCH',
  REST_USERS_GET_SUCCESS: '@@REST/USERS/GET_SUCCESS',
  REST_USERS_GET_FAILURE: '@@REST/USERS/GET_FAILURE',
}

export const Actions = {
  restUsersGetFetch: (id: string) => action(ActionsTypes.REST_USERS_GET_FETCH, { id }),
  restUsersGetSuccess: (user: UserData) => action(ActionsTypes.REST_USERS_GET_SUCCESS, { user }),
  restUsersGetFailure: (error: string) => action(ActionsTypes.REST_USERS_GET_FAILURE, { error }),
}