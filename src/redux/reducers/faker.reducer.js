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

const randomCpy = { ...random }
const dateCpy = { ...date }
delete randomCpy.objectElement
delete randomCpy.arrayElement
delete dateCpy.between

const names = { ...name }
names.fullName = name.findName
delete names.findName
const objects = {
  random: randomCpy,
  name: names,
  address,
  commerce,
  company,
  database,
  date: dateCpy,
  finance,
  hacker,
  image,
  internet,
  lorem,
  phone,
}

const initialState = Object.keys(objects)
  .map((name) =>
    Object.keys(objects[name]).map((funName) => ({
      groupName: name,
      label: (() => {
        const res = funName.replace(/([A-Z])/g, ' $1')
        return `${res.charAt(0).toUpperCase()}${res.slice(1)}`
      })(),
      value: funName,
    }))
  )
  .reduce((prevArr, currArr) => [...prevArr, ...currArr], [])

export default function (state = initialState, action) {
  return state
}
