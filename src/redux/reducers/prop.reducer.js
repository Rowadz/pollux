import {
  ADD_RPOP_NAME,
  REMOVE_ALL_RPOPS,
  EDIT_PROP,
  DELETE_PROP,
  JUST_ADD_PROP,
} from '../actionTypes'
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
    case JUST_ADD_PROP: {
      const { uuid: modelUuid, props } = action.payload
      return {
        ...state,
        [modelUuid]: [...(state[modelUuid] || []), ...props],
      }
    }
    case REMOVE_ALL_RPOPS: {
      const uuid = action.payload
      delete state[uuid]
      return { ...state }
    }
    case EDIT_PROP: {
      const { id: modelUuid, propId, ...propData } = action.payload
      // we need to save it in its orignal place
      const idx = state[modelUuid].findIndex(({ id }) => id === propId)
      const findProp = {
        ...state[modelUuid].find(({ id }) => id === propId),
        ...propData,
      }

      if (!propData.func && !findProp.func) delete findProp.func
      const without = state[modelUuid].filter(({ id }) => id !== propId)
      return {
        ...state,
        [modelUuid]: [
          ...without.slice(0, idx),
          findProp,
          ...without.slice(idx),
        ],
      }
    }
    case DELETE_PROP: {
      const { modelId, propId } = action.payload
      return {
        ...state,
        [modelId]: [...state[modelId].filter(({ id }) => id !== propId)],
      }
    }
    default:
      return state
  }
}
