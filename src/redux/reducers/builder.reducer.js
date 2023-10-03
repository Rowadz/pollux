import { TOGGLE_BUILDER } from '../actionTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state, { type, payload }) {
  switch (type) {
    case TOGGLE_BUILDER: {
      return { isOpen: !state.isOpen }
    }
    default: {
      return { isOpen: !!state?.isOpen }
    }
  }
}
