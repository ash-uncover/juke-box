import { appSelector } from '../appSelectors'

export const appProfileSelector = (state: any) => appSelector(state).profile

export const appProfileMessageEditSelector = (state: any) => appProfileSelector(state).messageEdit
