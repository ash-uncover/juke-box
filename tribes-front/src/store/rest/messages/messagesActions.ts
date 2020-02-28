import { action } from 'typesafe-actions'

import {
  ErrorData,
  MessageData,
} from '../../../types'

export const ActionsTypes = {
  REST_MESSAGES_GET_FETCH: '@@REST/MESSAGES/GET_FETCH',
  REST_MESSAGES_GET_SUCCESS: '@@REST/MESSAGES/GET_SUCCESS',
  REST_MESSAGES_GET_FAILURE: '@@REST/MESSAGES/GET_FAILURE',
}

export const Actions = {
  restMessagesGetFetch: (id: string) => action(ActionsTypes.REST_MESSAGES_GET_FETCH, { id }),
  restMessagesGetSuccess: (id: string, message: MessageData) => action(ActionsTypes.REST_MESSAGES_GET_SUCCESS, { id, message }),
  restMessagesGetFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_MESSAGES_GET_FAILURE, { id, error }),
}