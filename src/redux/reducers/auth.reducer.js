import { DISABLE_AUTH, ENABLE_AUTH } from '../actionTypes.js'

export default function (_, { type }) {
  switch (type) {
    case DISABLE_AUTH: {
      return false
    }
    case ENABLE_AUTH: {
      return true
    }
    default: {
      return false
    }
  }
}
