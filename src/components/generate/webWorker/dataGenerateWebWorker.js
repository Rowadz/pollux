import * as faker from 'faker'
import RandExp from 'randexp'

export const startGenerating = async (
  props,
  amount,
  modelId,
  relations,
  relationsProps
) => {
  if (relations) {
    postMessage({ type: 'STARTED', amount, modelId })
    const res = generateFakeData(props, amount)
    const resWithRelations = res.map((obj) => ({
      ...obj,
      ...relations.reduce(
        (prev, { name, id, amount }) => ({
          ...prev,
          [name]: generateFakeData(relationsProps[id], amount),
        }),
        {}
      ),
    }))
    postMessage({ type: 'STOPPED', amount, modelId })
    return resWithRelations
  }

  const data = generateFakeData(props, amount, modelId)
  postMessage({ type: 'STOPPED', amount, modelId })
  return data
}

/**
 * @description PLEASE DO NOT EDIT THIS, MY DUMBASS CAN't FIGURE A WAY TO IMPORT THIS CODE HERE
 * WHEN DOING THAT THE npm start COMMAND WILL STOP WORKING FOR SOME REASON!!
 * @param {Array<any>} props
 * @param {number} amount
 * @returns {Array<any>}
 *
 */
const generateFakeData = (props, amount, modelId) => {
  // postMessage({ type: 'STARTED', amount, modelId })
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
    // this runs in a web worker
    postMessage({ type: 'DOCUMENT_GENERATED', modelId })
    return singleDocument
  })
}
