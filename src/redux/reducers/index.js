import { combineReducers } from 'redux'
import models from './models.reducer.js'
import faker from './faker.reducer.js'
import prop from './prop.reducer.js'
import relations from './relation.reducer.js'
import auth from './auth.reducer.js'
import generateProgress from './generateProgress.reducer.js'
import locale from './locale.reducer.js'
import builder from './builder.reducer.js'

export default combineReducers({
  models,
  faker,
  prop,
  locale,
  relations,
  auth,
  builder,
  generateProgress,
})
