import * as mongoose from 'mongoose'
import { connectionString } from '../db-connection'
import Logger from 'ap-utils-logger'

const LOGGER = new Logger('Mongo Connection')

const connection = {
  open: (callback) => {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const db = mongoose.connection

    db.on('error', () => {
      LOGGER.error(`Failed to connect to database "${connectionString}"`)
    })

    db.once('open', () => {
      LOGGER.info(`Connected to database "${connectionString}"`)
      callback && callback()
    })

    return db
  }
}

export default connection