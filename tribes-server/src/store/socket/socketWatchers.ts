import * as ObjectUtils from '../../utils/ObjectUtils'

export const socketSessionWatcher = (id) => {
  let value
  return (state: any) => {
    const newValue = ObjectUtils.getProperty(state, `sessions.${id}`)
    if (newValue !== value) {
      value = newValue
      return newValue
    }
  }
}
