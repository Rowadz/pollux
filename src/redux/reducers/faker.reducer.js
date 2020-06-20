import {
  random,
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
import { v4 } from 'uuid'

const objects = {
  random,
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

const initialState = Object.keys(objects)
  .map((name) => [
    ...Object.keys(objects[name]).map((funName) => ({
      groupName: name,
      label: (() => {
        const res = funName.replace(/([A-Z])/g, ' $1')
        return `${res.charAt(0).toUpperCase()}${res.slice(1)}`
      })(),
      value: funName,
      id: v4(),
    })),
  ])
  .reduce((prevArr, currArr) => [...prevArr, ...currArr], [])

export default function (state = initialState, action) {
  return state
}
