import { ADD_MODEL } from '../actionTypes'

const initialState = {
  models: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_MODEL: {
      return {
        ...state,
        models: [...state.models, { ...action.payload }],
      }
    }
    default:
      return state
  }
}
