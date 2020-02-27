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

// Events collection
export const eventsSchema = new mongoose.Schema(Object.assign({
  name: { type: String },
  tribeId: { type: String },
  startDate: String,
  endDate: String,
}, defaultSchema))
eventsSchema.pre('save', preSave)
export const events = mongoose.model('events', eventsSchema)

// Friendship collection
export const friendshipsSchema = new mongoose.Schema(Object.assign({
  userId: { type: String },
  friendId: { type: String },
  status: { type: String },
}, defaultSchema))
friendshipsSchema.pre('save', preSave)
export const friendships = mongoose.model('friendships', friendshipsSchema)

// Memberships collection
export const membershipsSchema = new mongoose.Schema(Object.assign({
  tribeId: { type: String },
  userId: { type: String },
}, defaultSchema))
membershipsSchema.pre('save', preSave)
export const memberships = mongoose.model('memberships', membershipsSchema)

// Messages collection
export const messagesSchema = new mongoose.Schema(Object.assign({
  threadId: { type: String },
  userId: { type: String },
  text: { type: String },
  date: { type: Date },
  readBy: { type: [String] },
}, defaultSchema))
messagesSchema.pre('save', preSave)
export const messages = mongoose.model('messages', messagesSchema)

// Threads collection
export const threadsSchema = new mongoose.Schema(Object.assign({
  name: { type: String },
  type: { type: String },
  users: { type: [String] },
}, defaultSchema))
threadsSchema.pre('save', preSave)
export const threads = mongoose.model('threads', threadsSchema)

// Tribes collection
export const tribesSchema = new mongoose.Schema(Object.assign({
  name: { type: String },
}, defaultSchema))
tribesSchema.pre('save', preSave)
export const tribes = mongoose.model('tribes', tribesSchema)

// Users collection
export const usersSchema = new mongoose.Schema(Object.assign({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
}, defaultSchema))
usersSchema.pre('save', preSave)
export const users = mongoose.model('users', usersSchema)

const SCHEMAS = {
  EVENTS: {
    model: events,
    name: 'event',
    collection: 'events',
  },
  FRIENDSHIPS: {
    model: friendships,
    name: 'friendship',
    collection: 'friendships',
  },
  MEMBERSHIPS: {
    model: memberships,
    name: 'membership',
    collection: 'memberships',
  },
  MESSAGES: {
    model: messages,
    name: 'message',
    collection: 'messages',
  },
  THREADS: {
    model: threads,
    name: 'thread',
    collection: 'threads',
  },
  TRIBES: {
    model: tribes,
    name: 'tribe',
    collection: 'tribes',
  },
  USERS: {
    model: users,
    name: 'user',
    collection: 'users',
  },
}
export default SCHEMAS