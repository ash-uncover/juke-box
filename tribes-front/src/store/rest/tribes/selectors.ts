export const restTribesDataSelector = (state: any) => state.rest.tribes.data
export const restTribeDataSelector = (tribeId: string) => ((state: any) => state.rest.tribes.data[tribeId])
export const restTribesStatusSelector = (state: any) => state.rest.tribes.status
