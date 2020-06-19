import {
  ADD_MODEL,
  DELETE_MODEL,
  ADD_RPOP_NAME,
  REMOVE_ALL_RPOPS,
} from './actionTypes'

export const addModel = (model) => ({
  type: ADD_MODEL,
  payload: model,
})

export const deleteModel = (uuid) => ({
  type: DELETE_MODEL,
  payload: uuid,
})

export const addPropName = (uuidAndPropName) => ({
  type: ADD_RPOP_NAME,
  payload: uuidAndPropName,
})

export const removeAllProps = (uuid) => ({
  type: REMOVE_ALL_RPOPS,
  payload: uuid,
})
