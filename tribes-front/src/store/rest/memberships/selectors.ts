import { restSelector } from '../selectors'

export const restMembershipsSelector = (state: any) => restSelector(state).memberships

export const restMembershipsDataSelector = (state: any) =>restMembershipsSelector(state).data
export const restMembershipsStatusSelector = (state: any) =>restMembershipsSelector(state).status
export const restMembershipsErrorSelector = (state: any) =>restMembershipsSelector(state).error

export const restMembershipSelector = (id: string) => ((state: any) => restMembershipsDataSelector(state)[id])

export const restMembershipDataSelector = (id: string) => ((state: any) => restMembershipSelector(id)(state).data)
export const restMembershipStatusSelector = (id: string) => ((state: any) => restMembershipSelector(id)(state).status)
export const restMembershipErrorSelector = (id: string) => ((state: any) => restMembershipSelector(id)(state).error)
