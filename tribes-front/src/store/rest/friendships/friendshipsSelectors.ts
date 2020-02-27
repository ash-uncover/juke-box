import { restSelector } from '../selectors'

export const restFriendshipsSelector = (state: any) => restSelector(state).friendships

export const restFriendshipsDataSelector = (state: any) => restFriendshipsSelector(state).data
export const restFriendshipsStatusSelector = (state: any) => restFriendshipsSelector(state).status
export const restFriendshipsErrorSelector = (state: any) => restFriendshipsSelector(state).error

export const restFriendshipSelector = (id: string) => ((state: any) => restFriendshipsDataSelector(state)[id])

export const restFriendshipDataSelector = (id: string) => ((state: any) => restFriendshipSelector(id)(state).data)
export const restFriendshipStatusSelector = (id: string) => ((state: any) => restFriendshipSelector(id)(state).status)
export const restFriendshipErrorSelector = (id: string) => ((state: any) => restFriendshipSelector(id)(state).error)
