import * as mongoose from 'mongoose'
import { UUID } from '../utils'

// Common stuf
const defaultSchema = {
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

const preSave = function (next) {
  let now = new Date()
  this.id || (this.id = UUID.next())
  this._creationDate || (this._creationDate = now)
  this._lastUpdateDate = now
  next()
}

// Users collection
export const usersSchema = new mongoose.Schema(Object.assign({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String }
}, defaultSchema))
usersSchema.pre('save', preSave)
export const users = mongoose.model('users', usersSchema)

// Tribes collection
export const tribesSchema = new mongoose.Schema(Object.assign({
  name: String
}, defaultSchema))
tribesSchema.pre('save', preSave)
export const tribes = mongoose.model('tribes', tribesSchema)

// Memberships collection
export const membershipsSchema = new mongoose.Schema(Object.assign({
  tribeId: String,
  userId: String
}, defaultSchema))
membershipsSchema.pre('save', preSave)
export const memberships = mongoose.model('memberships', membershipsSchema)

// Friendship collection
export const friendshipsSchema = new mongoose.Schema(Object.assign({
  userId: String,
  friendId: String,
  status: String
}, defaultSchema))
friendshipsSchema.pre('save', preSave)
export const friendships = mongoose.model('friendships', friendshipsSchema)

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
  },
  MEMBERSHIPS: {
    model: memberships,
    name: 'membership',
    collection: 'memberships'
  },
  FRIENDSHIPS: {
    model: friendships,
    name: 'friendship',
    collection: 'friendships'
  },
}
export default SCHEMAS