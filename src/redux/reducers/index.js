import { combineReducers } from 'redux'
import models from './models.reducer'
import faker from './faker.reducer'
import prop from './prop.reducer'
import relations from './relation.reducer'
import auth from './auth.reducer'

export default combineReducers({ models, faker, prop, relations, auth })
