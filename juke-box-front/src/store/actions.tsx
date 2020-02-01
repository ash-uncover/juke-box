import { action } from 'typesafe-actions'

export const ActionsTypes = {
  USER_PUSH: 'USER_PUSH',
  TIMEOUT: 'TIMEOUT',
  SET_ON:'SET_ON',
  SET_OFF: 'SET_OFF'
}

export const Actions = {
  userPush: () => action(ActionsTypes.USER_PUSH),
  timeout: () => action(ActionsTypes.TIMEOUT),
  setOn: () => action(ActionsTypes.SET_ON),
  setOff: () => action(ActionsTypes.SET_OFF)
}