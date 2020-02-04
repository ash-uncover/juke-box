import mongoose from 'mongoose'
import { UUID } from '../utils'

// Common stuf
let defaultSchema = {
  id: { type: String },
  _creationDate: { type: Date },
  _lastUpdateDate: { type: Date }
}

export const RESERVED_FIELDS = [
  'id',
  '_creationDate',
  '_lastUpdateDate'
]

export const removeReserved = function (data) {
  RESERVED_FIELDS.forEach(function (field) {
    delete data[field]
  })
  return data
}

let preSave = function (next) {
  let now = new Date()
  this.id || (this.id = UUID.next())
  this._creationDate || (this._creationDate = now)
  this._lastUpdateDate = now
  next()
}

// Users collection
let usersSchema = mongoose.Schema(
  Object.assign(
    {
      name: { type: String, required: true },
      password: { type: String, required: true },
      image: { type: String },
      tribes: { type: [String] }
    },
    defaultSchema
  )
)
usersSchema.pre('save', preSave)
export const users = mongoose.model('users', usersSchema)

// Tribes collection
export const tribesSchema = mongoose.Schema(
  Object.assign(
    {
      name: String
    },
    defaultSchema
  )
)
tribesSchema.pre('save', preSave)
export const tribes = mongoose.model('tribes', tribesSchema)

const SCHEMAS = {
  USERS: {
    model: users,
    name: 'user',
    collection: 'users'
  },
  TRIBES: {
    model: tribes,
    name: 'tribe',
    collection: 'tribes'
  }
}
export default SCHEMAS