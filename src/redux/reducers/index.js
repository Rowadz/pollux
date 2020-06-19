import { combineReducers } from 'redux'
import models from './models.reducer'
import faker from './faker.reducer'

export default combineReducers({ models, faker })
