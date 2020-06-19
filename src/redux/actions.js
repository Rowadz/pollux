import { ADD_MODEL, DELETE_MODEL } from './actionTypes'

export const addModel = (model) => ({
  type: ADD_MODEL,
  payload: model,
})

export const deleteModel = (uuid) => ({
  type: DELETE_MODEL,
  payload: uuid,
})
