import { SET_PROGRESS } from '../actionTypes'

export default function (state = {}, { type, payload }) {
  switch (type) {
    case SET_PROGRESS: {
      return { [payload.modelId]: (state[payload.modelId] || 0) + 1 }
    }
    default: {
      return {}
    }
  }
}
