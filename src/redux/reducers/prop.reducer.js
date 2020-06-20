import { ADD_RPOP_NAME, REMOVE_ALL_RPOPS, EDIT_PROP } from '../actionTypes'
import { v4 } from 'uuid'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_RPOP_NAME: {
      const { uuid, propName } = action.payload
      return {
        ...state,
        [uuid]: [...(state[uuid] || []), { propName, id: v4() }],
      }
    }
    case REMOVE_ALL_RPOPS: {
      const uuid = action.payload
      delete state[uuid]
      return { ...state }
    }
    case EDIT_PROP: {
      const { newName, id: modelUuid, propId } = action.payload
      const findProp = {
        ...state[modelUuid].find(({ id }) => id === propId),
        propName: newName,
      }
      return {
        ...state,
        [modelUuid]: [
          ...state[modelUuid].filter(({ id }) => id !== propId),
          findProp,
        ],
      }
    }
    default:
      return state
  }
}
