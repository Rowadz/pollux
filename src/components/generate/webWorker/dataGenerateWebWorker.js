import * as faker from 'faker'
import RandExp from 'randexp'
import { eventEmitter } from './eventEmitter'

// eventEmitter.on('DOCUMENT_GENERATED', (data) => {
//   console.log(data)
// })

// onmessage = function (e) {
//   const { amount, props, generateFakeData } = e.data
//   setInterval(() => {
//     postMessage({ props, amount, generateFakeData })
//   }, 1000)
// }

export const getEventEmitter = () => eventEmitter

export const startGenerating = (props, amount) =>
  generateFakeData(props, amount)

/**
 * @description PLEASE DO NOT EDIT THIS, MY DUMBASS CAN't FIGURE A WAY TO IMPORT THIS CODE HERE
 * WHEN DOING THAT THE npm start COMMAND WILL STOP WORKING FOR SOME REASON!!
 * @param {Array<any>} props
 * @param {number} amount
 * @returns {Array<any>}
 *
 */
const generateFakeData = (props, amount, modelId) => {
  eventEmitter.emit('STARTED', { amount, modelId })
  return Array.from({ length: amount }).map(() => {
    const singleDocument = props.reduce(
      (prev, { propName, groupName, func, regex: regexStr }) => {
        if (
          groupName === 'image' ||
          (groupName === 'random' && func === 'image')
        ) {
          return {
            ...prev,
            [propName]: faker.random.arrayElement([
              'http://placekitten.com/500/600',
              'http://placekitten.com/1200/600',
              'http://placekitten.com/1200/1200',
            ]),
          }
        }
        const key = func === 'fullName' ? 'findName' : func
        if (key === 'regex') {
          const randexp = new RandExp(regexStr)
          return {
            ...prev,
            [propName]: randexp.gen(),
          }
        }

        return {
          ...prev,
          [propName]: faker[groupName][key](),
        }
      },
      {}
    )
    eventEmitter.emit('DOCUMENT_GENERATED', { data: 1 })
    return singleDocument
  })
}
