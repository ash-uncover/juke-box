import {
  removeReserved
} from '../database/schemas'

import {
  HttpStatus
} from '../utils/HttpUtils'

import Logger from 'ap-utils-logger'
const LOGGER = new Logger('servlet-base')

export const defaultGetAll = (schema, req, res, next) => {
  schema.model.find().select('-_id -__v').exec((err, data) => {
    err ? res.status(HttpStatus.ERROR).send(err) : res.json(data)
  })
}

export const defaultPost = (schema, req, res, next, onError) => {
  const data = new schema.model(removeReserved(req.body))
  data.save((err) => {
    err ?
      (onError ? onError(err) : res.status(HttpStatus.ERROR).send(err))
    :
      res.status(HttpStatus.CREATED).send({ id: data.id })
  })
}

export const defaultGet = (schema, req, res, next, onError) => {
  schema.model.findOne({ id: req.params[`${schema.name}Id`] }).select('-_id -__v').exec((err, data) => {
    err ?
      (onError ? onError(err) : res.status(HttpStatus.ERROR).send(err))
    :
      (data ? res.json(data) : res.sendStatus(HttpStatus.NOT_FOUND))
  })
}

export const defaultPut = (schema, req, res, next, onError) => {
  schema.model.findOne({ id: req.params[`${schema.name}Id`] }, (err, data) => {
    if (err) {
      res.status(HttpStatus.ERROR).send(err)
    } else if (data) {
      Object.assign(data, removeReserved(req.body))
      data.save((err) => {
        err ? (onError ? onError(err) : res.status(HttpStatus.ERROR).send(err)) : res.sendStatus(HttpStatus.OK)
      })
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND)
    }
  })
}

export const defaultPatch = (schema, req, res, next, onError) => {
  schema.model.findOne({ id: req.params[`${schema.name}Id`] }, (err, data) => {
    if (err) {
      res.status(HttpStatus.ERROR).send(err)
    } else if (data) {
      Object.assign(data, removeReserved(req.body))
      data.save((err) => {
        err ? (onError ? onError(err) : res.status(HttpStatus.ERROR).send(err)) : res.sendStatus(HttpStatus.OK)
      })
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND)
    }
  })
}

export const defaultDelete = (schema, req, res, next, onError) => {
  schema.model.remove({ id: req.params[`${schema.name}Id`] }, (err, data) => {
    err ? (onError ? onError(err) : res.status(HttpStatus.ERROR).send(err)) : res.sendStatus(HttpStatus.REMOVED)
  })
}

export const defaultGetDeep = (schema, req, res, next, onError) => {
  schema.model.find(req.params).select('-_id -__v').exec((err, data) => {
    err ? (onError ? onError(err) : res.status(HttpStatus.ERROR).send(err)) : res.json(data)
  })
}
