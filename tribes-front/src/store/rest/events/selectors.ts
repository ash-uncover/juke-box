import { restSelector } from '../selectors'

export const restEventsSelector = (state: any) => restSelector(state).events

export const restEventsDataSelector = (state: any) =>restEventsSelector(state).data
export const restEventsStatusSelector = (state: any) =>restEventsSelector(state).status
export const restEventsErrorSelector = (state: any) =>restEventsSelector(state).error

export const restEventSelector = (id: string) => ((state: any) => restEventsDataSelector(state)[id])

export const restEventDataSelector = (id: string) => ((state: any) => restEventSelector(id)(state).data)
export const restEventStatusSelector = (id: string) => ((state: any) => restEventSelector(id)(state).status)
export const restEventErrorSelector = (id: string) => ((state: any) => restEventSelector(id)(state).error)