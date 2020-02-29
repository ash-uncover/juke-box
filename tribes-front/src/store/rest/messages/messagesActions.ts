import { action } from 'typesafe-actions'

import {
  ErrorData,
  MessageData,
} from '../../../types'

export const ActionsTypes = {
  REST_MESSAGES_GET_FETCH: '@@REST/MESSAGES/GET_FETCH',
  REST_MESSAGES_GET_SUCCESS: '@@REST/MESSAGES/GET_SUCCESS',
  REST_MESSAGES_GET_FAILURE: '@@REST/MESSAGES/GET_FAILURE',

  REST_MESSAGES_POST_FETCH: '@@REST/MESSAGES/POST_FETCH',
  REST_MESSAGES_POST_SUCCESS: '@@REST/MESSAGES/POST_SUCCESS',
  REST_MESSAGES_POST_FAILURE: '@@REST/MESSAGES/POST_FAILURE',
}

export const Actions = {
  restMessagesGetFetch: (id: string) => action(ActionsTypes.REST_MESSAGES_GET_FETCH, { id }),
  restMessagesGetSuccess: (id: string, message: MessageData) => action(ActionsTypes.REST_MESSAGES_GET_SUCCESS, { id, message }),
  restMessagesGetFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_MESSAGES_GET_FAILURE, { id, error }),

  restMessagesPostFetch: (threadId: string) => action(ActionsTypes.REST_MESSAGES_POST_FETCH, { threadId }),
  restMessagesPostSuccess: (message: MessageData) => action(ActionsTypes.REST_MESSAGES_POST_SUCCESS, { message }),
  restMessagesPostFailure: (error: ErrorData) => action(ActionsTypes.REST_MESSAGES_POST_FAILURE, { error }),
}