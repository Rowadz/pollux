import { TOGGLE_BUILDER } from '../actionTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (_, { type, payload }) {
  switch (type) {
    case TOGGLE_BUILDER: {
      return payload
    }
    default: {
      return false
    }
  }
}
