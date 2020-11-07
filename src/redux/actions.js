import {
  ADD_MODEL,
  DELETE_MODEL,
  ADD_RPOP_NAME,
  REMOVE_ALL_RPOPS,
  EDIT_PROP,
  DELETE_PROP,
  JUST_ADD_PROP,
  ADD_RELATION,
  REMOVE_RELATION,
  UPDATE_AMOUNT,
} from './actionTypes'

/**
 *
 * @param {Object} model - the model object
 * @param {string} model.name - the model name
 * @param {string} model.id - the model uuid
 * @param {Date} model.createdAt - the mode timestamp
 */
export const addModel = (model) => ({
  type: ADD_MODEL,
  payload: model,
})

/**
 *
 * @param {string} uuid - the prop uuid
 *
 */
export const deleteModel = (uuid) => ({
  type: DELETE_MODEL,
  payload: uuid,
})

/**
 *
 * @param {Object} props - the props object
 * @param {string} props.uuid - the model uuid
 * @param {string} props.propName - the props name
 */
export const addPropName = (props) => ({
  type: ADD_RPOP_NAME,
  payload: props,
})

/**
 *
 * @param {Object} props - object
 * @param {Object} props.id - the props id
 * @param {string} props.uuid - the model uuid
 * @param {string} props.propName - the props name
 * @param {string} props.func - the props random func
 * @param {string} props.groupName - the props groupName for the random func
 */
export const justAddProp = (props) => ({
  type: JUST_ADD_PROP,
  payload: props,
})

/**
 *
 * @param {string} uuid - the prop uuid
 *
 */
export const removeAllProps = (uuid) => ({
  type: REMOVE_ALL_RPOPS,
  payload: uuid,
})

/**
 * @param {Object} props - the prop object
 * @param {string} props.propId - the prop uuid
 * @param {string} props.id - the model uuid
 * @param {string} props.newName - the new prop name
 * @param {string} props.groupName - the top lvl obj name for faker
 * @param {string} props.func - the faker function
 */
export const editProp = (props) => ({
  type: EDIT_PROP,
  payload: props,
})

/**
 *
 * @param {Object} props - the prop object
 * @param {string} props.propId - the prop uuid
 * @param {string} props.modelId - the model uuid
 */
export const delProp = (props) => ({
  type: DELETE_PROP,
  payload: props,
})

/**
 *
 * @param {Object} props - the prop object
 * @param {string} props.distId - the model uuid to create relation with
 * @param {string} props.modelId - the model uuid
 */
export const addRelation = (props) => ({
  type: ADD_RELATION,
  payload: props,
})

/**
 *
 * @param {Object} props - the prop object
 * @param {string} props.distId - the model uuid to remove from the relation
 * @param {string} props.modelId - the model uuid
 */
export const removeRelation = (props) => ({
  type: REMOVE_RELATION,
  payload: props,
})



/**
 *
 * @param {Object} props - the prop object
 * @param {string} props.amount - the amount of data to generate
 * @param {string} props.modelId - the model uuid
 */
export const updateAmount = (props) => ({
  type: UPDATE_AMOUNT,
  payload: props,
})