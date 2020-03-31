import * as ObjectUtils from './ObjectUtils'
import Logger from 'ap-utils-logger'
const LOGGER = new Logger('StoreWatcher')

export const storeWatcher = (store, path, fn) => {
  let value
  store.subscribe(() => {
    const newValue = ObjectUtils.getProperty(store.getState(), path)
    console.log('calling... [' + value + '] / [' + newValue + ']')
    if (newValue !== value) {
      LOGGER.info(`Watch ${path} changed`)
      LOGGER.info(JSON.stringify(value))
      LOGGER.info(JSON.stringify(newValue))
      value = newValue
      fn(value)
    }
  })
}
