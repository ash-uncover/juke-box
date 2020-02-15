import * as mongoose from 'mongoose'
import Logger from 'ap-utils-logger'

const LOGGER = new Logger('Mongo Connection')

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = 4242,
  DB_NAME = 'tribes'
} = process.env

const urlmongo = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const connection = {
  open: (callback) => {
    mongoose.connect(urlmongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const db = mongoose.connection

    db.on('error', () => {
      LOGGER.error(`Failed to connect to database "${urlmongo}"`)
    })

    db.once('open', () => {
      LOGGER.info(`Connected to database "${urlmongo}"`)
      callback && callback()
    })

    return db
  }
}

export default connection