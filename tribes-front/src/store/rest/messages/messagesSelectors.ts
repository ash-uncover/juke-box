import { restSelector } from '../selectors'

export const restMessagesSelector = (state: any) => restSelector(state).messages

export const restMessagesDataSelector = (state: any) => restMessagesSelector(state).data
export const restMessagesStatusSelector = (state: any) => restMessagesSelector(state).status
export const restMessagesErrorSelector = (state: any) => restMessagesSelector(state).error

export const restMessageSelector = (id: string) => ((state: any) => restMessagesDataSelector(state)[id])

export const restMessageDataSelector = (id: string) => ((state: any) => restMessageSelector(id)(state).data)
export const restMessageStatusSelector = (id: string) => ((state: any) => restMessageSelector(id)(state).status)
export const restMessageErrorSelector = (id: string) => ((state: any) => restMessageSelector(id)(state).error)
