import { SET_LOCALE } from '../actionTypes.js'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (_, { type, payload }) {
  switch (type) {
    case SET_LOCALE: {
      return payload
    }
    default: {
      return 'en'
    }
  }
}
