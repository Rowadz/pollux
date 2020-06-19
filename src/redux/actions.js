import { ADD_MODEL, DELETE_MODEL, ADD_RPOP_NAME } from './actionTypes'

export const addModel = (model) => ({
  type: ADD_MODEL,
  payload: model,
})

export const deleteModel = (uuid) => ({
  type: DELETE_MODEL,
  payload: uuid,
})

export const addPropName = (propName) => ({
  type: ADD_RPOP_NAME,
  payload: propName,
})
