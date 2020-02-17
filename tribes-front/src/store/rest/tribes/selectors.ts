import { restSelector } from '../selectors'

export const restTribesSelector = (state: any) => restSelector(state).tribes

export const restTribesDataSelector = (state: any) => restTribesSelector(state).data
export const restTribesStatusSelector = (state: any) => restTribesSelector(state).status
export const restTribesErrorSelector = (state: any) => restTribesSelector(state).error

export const restTribeSelector = (id: string) => ((state: any) => restTribesDataSelector(state)[id])

export const restTribeDataSelector = (id: string) => ((state: any) => restTribeSelector(id)(state).data)
export const restTribeStatusSelector = (id: string) => ((state: any) => restTribeSelector(id)(state).status)
export const restTribeErrorSelector = (id: string) => ((state: any) => restTribeSelector(id)(state).error)

export const restTribeMembershipsDataSelector = (id: string) => ((state: any) => restTribeSelector(id)(state).membershipsData)
export const restTribeMembershipsStatusSelector = (id: string) => ((state: any) => restTribeSelector(id)(state).membershipsStatus)
export const restTribeMembershipsErrorSelector = (id: string) => ((state: any) => restTribeSelector(id)(state).membershipsError)