import { ADD_MODEL, DELETE_MODEL } from '../actionTypes'

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_MODEL: {
      return [...state, { ...action.payload }]
    }
    case DELETE_MODEL: {
      const { payload: uuid } = action
      return state.filter(({ id }) => id !== uuid)
    }
    default:
      return state
  }
}
