import { createStore } from 'redux'
import rootReducer from './reducers/index.js'
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(rootReducer, composeWithDevTools())
