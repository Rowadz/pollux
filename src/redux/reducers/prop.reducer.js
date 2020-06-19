import { ADD_RPOP_NAME } from '../actionTypes'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_RPOP_NAME: {
      const { payload: propName } = action
      return {
        ...state,
        [propName]: [],
      }
    }
    default:
      return state
  }
}
