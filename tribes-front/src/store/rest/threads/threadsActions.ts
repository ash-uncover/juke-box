import { action } from 'typesafe-actions'

import {
  ErrorData,
  MessageData,
  ThreadData,
} from '../../../types'

export const ActionsTypes = {
  REST_THREADS_GET_FETCH: '@@REST/THREADS/GET_FETCH',
  REST_THREADS_GET_SUCCESS: '@@REST/THREADS/GET_SUCCESS',
  REST_THREADS_GET_FAILURE: '@@REST/THREADS/GET_FAILURE',

  REST_THREADS_MESSAGES_GETALL_FETCH: '@@REST/THREADS/MESSAGES/GETALL_FETCH',
  REST_THREADS_MESSAGES_GETALL_SUCCESS: '@@REST/THREADS/MESSAGES/GETALL_SUCCESS',
  REST_THREADS_MESSAGES_GETALL_FAILURE: '@@REST/THREADS/MESSAGES/GETALL_FAILURE',
}

export const Actions = {
  restThreadsGetFetch: (id: string) => action(ActionsTypes.REST_THREADS_GET_FETCH, { id }),
  restThreadsGetSuccess: (id: string, thread: ThreadData) => action(ActionsTypes.REST_THREADS_GET_SUCCESS, { id, thread }),
  restThreadsGetFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_THREADS_GET_FAILURE, { id, error }),

  restThreadsMessagesGetAllFetch: (id: string) => action(ActionsTypes.REST_THREADS_MESSAGES_GETALL_FETCH, { id }),
  restThreadsMessagesGetAllSuccess: (id: string, messages: Array<MessageData>) => action(ActionsTypes.REST_THREADS_MESSAGES_GETALL_SUCCESS, { id, messages }),
  restThreadsMessagesGetAllFailure: (id: string, error: ErrorData) => action(ActionsTypes.REST_THREADS_MESSAGES_GETALL_FAILURE, { id, error }),
}