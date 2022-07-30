import { combineReducers } from 'redux'
import models from './models.reducer'
import faker from './faker.reducer'
import prop from './prop.reducer'
import relations from './relation.reducer'
import auth from './auth.reducer'
import generateProgress from './generateProgress.reducer'
import locale from './locale.reducer'

export default combineReducers({
  models,
  faker,
  prop,
  locale,
  relations,
  auth,
  generateProgress,
})
