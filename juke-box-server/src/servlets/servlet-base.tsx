import { removeReserved } from '../database/schemas'

export const defaultGetAll = (schema, req, res, next) => {
  schema.model.find().select('-_id -__v').exec((err, data) => {
    err ? res.send(500, err) : res.json(data)
  })
}

export const defaultPost = (schema, req, res, next, onError) => {
  const data = new schema.model(removeReserved(req.body))
  data.save((err) => {
    err ?
      (onError ? onError(err) : res.send(500, err))
    :
      res.send(201, { id: data.id })
  })
}

export const defaultGet = (schema, req, res, next, onError) => {
  schema.model.findOne({ id: req.params[`${schema.name}Id`] }).select('-_id -__v').exec((err, data) => {
    err ?
      (onError ? onError(err) : res.send(500, err))
    :
      (data ? res.json(data) : res.send(404, { error: 'NOT FOUND' }))
  })
}

export const defaultPut = (schema, req, res, next, onError) => {
  schema.model.findOne({ id: req.params[`${schema.name}Id`] }, (err, data) => {
    if (err) {
      res.send(500, err)
    } else if (data) {
      Object.assign(data, removeReserved(req.body))
      data.save((err) => {
        err ? (onError ? onError(err) : res.send(500, err)) : res.send(204)
      })
    } else {
      res.send(404, { error: 'NOT FOUND' })
    }
  })
}

export const defaultDelete = (schema, req, res, next, onError) => {
  schema.model.remove({ id: req.params[`${schema.name}Id`] }, (err, data) => {
    err ? (onError ? onError(err) : res.send(500, err)) : res.send(204)
  })
}

export const defaultGetDeep = (schema, req, res, next, onError) => {
  schema.model.find(req.params).select('-_id -__v').exec((err, data) => {
    err ? (onError ? onError(err) : res.send(500, err)) : res.json(data)
  })
}
