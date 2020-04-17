import { action } from 'typesafe-actions'

export const ActionsTypes = {
  APP_PROFILE_THREAD_MESSAGE_EDIT: '@@APP/PROFILE/THREAD/MESSAGE_EDIT',
  APP_PROFILE_THREAD_MESSAGE_RELEASE: '@@APP/PROFILE/THREAD/MESSAGE_RELEASE',
}

export const Actions = {
  appProfileMessageEdit: (threadId: string, messageId: string) => action(ActionsTypes.APP_PROFILE_THREAD_MESSAGE_EDIT, { threadId, messageId }),
  appProfileMessageRelease: () => action(ActionsTypes.APP_PROFILE_THREAD_MESSAGE_RELEASE),
}