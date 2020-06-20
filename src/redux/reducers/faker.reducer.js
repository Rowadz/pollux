import {
  name,
  address,
  commerce,
  company,
  database,
  date,
  finance,
  hacker,
  image,
  internet,
  lorem,
  phone,
} from 'faker'

const objects = {
  name,
  address,
  commerce,
  company,
  database,
  date,
  finance,
  hacker,
  image,
  internet,
  lorem,
  phone,
}

const initialState = Object.keys(objects).map((name) => [
  ...Object.keys(objects[name]).map((funName) => ({
    groupName: name,
    label: funName,
    value: funName,
  })),
])

export default function (state = initialState, action) {
  return state
}
