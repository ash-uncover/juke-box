import { action } from 'typesafe-actions'

import {
  ErrorData,
  MessageData,
  MessagePostData,
} from '../../../types'

export const ActionsTypes = {
  REST_MESSAGES_GET_FETCH: '@@REST/MESSAGES/GET_FETCH',
  REST_MESSAGES_GET_SUCCESS: '@@REST/MESSAGES/GET_SUCCESS',
  REST_MESSAGES_GET_FAILURE: '@@REST/MESSAGES/GET_FAILURE',

  REST_MESSAGES_POST_FETCH: '@@REST/MESSAGES/POST_FETCH',
  REST_MESSAGES_POST_SUCCESS: '@@REST/MESSAGES/POST_SUCCESS',
  REST_MESSAGES_POST_FAILURE: '@@REST/MESSAGES/POST_FAILURE',

  REST_MESSAGES_DELETE_FETCH: '@@REST/MESSAGES/DELETE_FETCH',
  REST_MESSAGES_DELETE_SUCCESS: '@@REST/MESSAGES/DELETE_SUCCESS',
  REST_MESSAGES_DELETE_FAILURE: '@@REST/MESSAGES/DELETE_FAILURE',
}

const extractIds = (message: MessageData) => {
  return {
    id: message.id,
    threadId: message.threadId,
    userId: message.userId
  }
}

export const Actions = {
  restMessagesGetFetch: (id: string) => action(ActionsTypes.REST_MESSAGES_GET_FETCH, { id }),
  restMessagesGetSuccess: (id: string, message: MessageData) => action(ActionsTypes.REST_MESSAGES_GET_SUCCESS, { id, message }),
  restMessagesGetFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_MESSAGES_GET_FAILURE, { id, error }),

  restMessagesPostFetch: (message: MessagePostData) => action(ActionsTypes.REST_MESSAGES_POST_FETCH, { message }),
  restMessagesPostSuccess: (message: MessageData) => action(ActionsTypes.REST_MESSAGES_POST_SUCCESS, { message }),
  restMessagesPostFailure: (message: MessagePostData, error: ErrorData) => action(ActionsTypes.REST_MESSAGES_POST_FAILURE, { error, message }),

  restMessagesDeleteFetch: (message: MessageData) => action(ActionsTypes.REST_MESSAGES_DELETE_FETCH, { message: extractIds(message) }),
  restMessagesDeleteSuccess: (message: MessageData) => action(ActionsTypes.REST_MESSAGES_DELETE_SUCCESS, { message: extractIds(message) }),
  restMessagesDeleteFailure: (message: MessageData, error: ErrorData) => action(ActionsTypes.REST_MESSAGES_DELETE_FAILURE, { message: extractIds(message), error }),
}
