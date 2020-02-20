import { action } from 'typesafe-actions'

import {
  ErrorData,
  MembershipData,
  UserData,
} from '../../../types'

export const ActionsTypes = {
  REST_USERS_GET_FETCH: '@@REST/USERS/GET_FETCH',
  REST_USERS_GET_SUCCESS: '@@REST/USERS/GET_SUCCESS',
  REST_USERS_GET_FAILURE: '@@REST/USERS/GET_FAILURE',

  REST_USERS_MEMBERSHIPS_GETALL_FETCH: '@@REST/USERS/MEMBERSHIPS/GETALL_FETCH',
  REST_USERS_MEMBERSHIPS_GETALL_SUCCESS: '@@REST/USERS/MEMBERSHIPS/GETALL_SUCCESS',
  REST_USERS_MEMBERSHIPS_GETALL_FAILURE: '@@REST/USERS/MEMBERSHIPS/GETALL_FAILURE',
}

export const Actions = {
  restUsersGetFetch: (id: string) => action(ActionsTypes.REST_USERS_GET_FETCH, { id }),
  restUsersGetSuccess: (id: string, user: UserData) => action(ActionsTypes.REST_USERS_GET_SUCCESS, { id, user }),
  restUsersGetFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_USERS_GET_FAILURE, { id, error }),

  restUsersMembershipsGetAllFetch: (id: string) => action(ActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_FETCH, { id }),
  restUsersMembershipsGetAllSuccess: (id: string, memberships: Array<MembershipData>) => action(ActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_SUCCESS, { id, memberships }),
  restUsersMembershipsGetAllFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_USERS_MEMBERSHIPS_GETALL_FAILURE, { id, error }),
}