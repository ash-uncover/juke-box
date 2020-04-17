import { restSelector } from '../restSelectors'

export const restUsersSelector = (state: any) => restSelector(state).users

export const restUsersDataSelector = (state: any) => restUsersSelector(state).data
export const restUsersStatusSelector = (state: any) => restUsersSelector(state).status
export const restUsersErrorSelector = (state: any) => restUsersSelector(state).error

export const restUserSelector = (id: string) => ((state: any) =>  restUsersDataSelector(state)[id])

export const restUserDataSelector = (id: string) => ((state: any) => restUserSelector(id)(state).data)
export const restUserStatusSelector = (id: string) => ((state: any) => restUserSelector(id)(state).status)
export const restUserErrorSelector = (id: string) => ((state: any) => restUserSelector(id)(state).error)

export const restUserMembershipsDataSelector = (id: string) => ((state: any) => restUserSelector(id)(state).membershipsData)
export const restUserMembershipsStatusSelector = (id: string) => ((state: any) => restUserSelector(id)(state).membershipsStatus)
export const restUserMembershipsErrorSelector = (id: string) => ((state: any) => restUserSelector(id)(state).membershipsError)

export const restUserFriendshipsDataSelector = (id: string) => ((state: any) => restUserSelector(id)(state).friendshipsData)
export const restUserFriendshipsStatusSelector = (id: string) => ((state: any) => restUserSelector(id)(state).friendshipsStatus)
export const restUserFriendshipsErrorSelector = (id: string) => ((state: any) => restUserSelector(id)(state).friendshipsError)

export const restUserThreadsDataSelector = (id: string) => ((state: any) => restUserSelector(id)(state).threadsData)
export const restUserThreadsStatusSelector = (id: string) => ((state: any) => restUserSelector(id)(state).threadsStatus)
export const restUserThreadsErrorSelector = (id: string) => ((state: any) => restUserSelector(id)(state).threadsError)
