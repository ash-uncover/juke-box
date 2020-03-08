import { restSelector } from '../restSelectors'

export const restThreadsSelector = (state: any) => restSelector(state).threads

export const restThreadsDataSelector = (state: any) => restThreadsSelector(state).data
export const restThreadsStatusSelector = (state: any) => restThreadsSelector(state).status
export const restThreadsErrorSelector = (state: any) => restThreadsSelector(state).error

export const restThreadSelector = (id: string) => ((state: any) => restThreadsDataSelector(state)[id])

export const restThreadDataSelector = (id: string) => ((state: any) => restThreadSelector(id)(state).data)
export const restThreadStatusSelector = (id: string) => ((state: any) => restThreadSelector(id)(state).status)
export const restThreadErrorSelector = (id: string) => ((state: any) => restThreadSelector(id)(state).error)

export const restThreadMessagesDataSelector = (id: string) => ((state: any) => restThreadSelector(id)(state).messagesData)
export const restThreadMessagesStatusSelector = (id: string) => ((state: any) => restThreadSelector(id)(state).messagesStatus)
export const restThreadMessagesErrorSelector = (id: string) => ((state: any) => restThreadSelector(id)(state).messagesError)