import { ADD_RELATION, REMOVE_RELATION } from '../actionTypes.js'

const initialState = {}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_RELATION: {
      const { distId, modelId } = payload
      return {
        ...state,
        [modelId]: [...(state[modelId] || []), distId],
      }
    }
    case REMOVE_RELATION: {
      const { distId, modelId } = payload
      return {
        ...state,
        [modelId]: (state[modelId] || []).filter((id) => distId !== id),
      }
    }
    default:
      return state
  }
}
