import { ADD_MODEL, DELETE_MODEL, UPDATE_AMOUNT } from '../actionTypes'

const initialState = []

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_MODEL: {
      return [...state, { ...payload, amount: payload.amount || 10 }]
    }
    case DELETE_MODEL: {
      return state.filter(({ id }) => id !== payload)
    }
    case UPDATE_AMOUNT: {
      // payload is num here
      const { modelId, amount } = payload
      return state.map((model) => {
        if (model.id === modelId) {
          return { ...model, amount }
        } else {
          return { ...model }
        }
      })
    }
    default:
      return state
  }
}
