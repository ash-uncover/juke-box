import * as mongoose from 'mongoose'

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = 4242,
  DB_NAME = 'tribes'
} = process.env

const urlmongo = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const connection = {
  open: (callback) => {
    mongoose.connect(urlmongo, {})

    const db = mongoose.connection

    db.on('error', () => {
      console.error(`Failed to connect to database "${urlmongo}"`)
    })

    db.once('open', () => {
      console.log(`Connected to database "${urlmongo}"`)
      callback && callback()
    })

    return db
  }
}

export default connection