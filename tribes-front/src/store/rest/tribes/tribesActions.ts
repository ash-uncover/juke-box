import { action } from 'typesafe-actions'

import {
  ErrorData,
  MembershipData,
  TribeData,
  EventData,
} from '../../../types'

export const ActionsTypes = {
  REST_TRIBES_GET_FETCH: '@@REST/TRIBES/GET_FETCH',
  REST_TRIBES_GET_SUCCESS: '@@REST/TRIBES/GET_SUCCESS',
  REST_TRIBES_GET_FAILURE: '@@REST/TRIBES/GET_FAILURE',

  REST_TRIBES_MEMBERSHIPS_GETALL_FETCH: '@@REST/TRIBES/MEMBERSHIPS/GETALL_FETCH',
  REST_TRIBES_MEMBERSHIPS_GETALL_SUCCESS: '@@REST/TRIBES/MEMBERSHIPS/GETALL_SUCCESS',
  REST_TRIBES_MEMBERSHIPS_GETALL_FAILURE: '@@REST/TRIBES/MEMBERSHIPS/GETALL_FAILURE',

  REST_TRIBES_EVENTS_GETALL_FETCH: '@@REST/TRIBES/EVENTS/GETALL_FETCH',
  REST_TRIBES_EVENTS_GETALL_SUCCESS: '@@REST/TRIBES/EVENTS/GETALL_SUCCESS',
  REST_TRIBES_EVENTS_GETALL_FAILURE: '@@REST/TRIBES/EVENTS/GETALL_FAILURE',
}

export const Actions = {
  restTribesGetFetch: (id: string) => action(ActionsTypes.REST_TRIBES_GET_FETCH, { id }),
  restTribesGetSuccess: (id: string, tribe: TribeData) => action(ActionsTypes.REST_TRIBES_GET_SUCCESS, { id, tribe }),
  restTribesGetFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_TRIBES_GET_FAILURE, { id, error }),

  restTribesMembershipsGetAllFetch: (id: string) => action(ActionsTypes.REST_TRIBES_MEMBERSHIPS_GETALL_FETCH, { id }),
  restTribesMembershipsGetAllSuccess: (id: string, memberships: Array<MembershipData>) => action(ActionsTypes.REST_TRIBES_MEMBERSHIPS_GETALL_SUCCESS, { id, memberships }),
  restTribesMembershipsGetAllFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_TRIBES_MEMBERSHIPS_GETALL_FAILURE, { id, error }),

  restTribesEventsGetAllFetch: (id: string) => action(ActionsTypes.REST_TRIBES_EVENTS_GETALL_FETCH, { id }),
  restTribesEventsGetAllSuccess: (id: string, events: Array<EventData>) => action(ActionsTypes.REST_TRIBES_EVENTS_GETALL_SUCCESS, { id, events }),
  restTribesEventsGetAllFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_TRIBES_EVENTS_GETALL_FAILURE, { id, error }),
}