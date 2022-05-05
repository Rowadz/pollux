import { Alert } from 'rsuite'
import * as faker from 'faker'
import { saveAs } from 'file-saver'
import RandExp from 'randexp'
import JSZip from 'jszip'
import npmCongif from '../../../../zipFileContent/package.json'
import apiReadme from '../../../../zipFileContent/readme.md'

import { spawnWebWorker } from '../../webWorker'

/**
 *
 * @param {Array<any>} props
 * @param {string} name
 * @param {number} amount
 * @param {Array<any>} relations
 * @param {object} relationsProps
 * @param {boolean} justReturn
 * @param {string} modelId
 */
export const generate = (
  props,
  name,
  amount,
  relations,
  relationsProps,
  justReturn,
  modelId,
  onlyJSON = false
) => {
  if (!props) {
    Alert.warning(`plz add some properties to this model (${name})`)
    return
  }
  const atLeastOneWithoutFunc = props
    .filter(({ func }) => !func)
    .map(({ propName }) => propName)
  const len = atLeastOneWithoutFunc.length
  if (len > 0) {
    Alert.warning(
      `There is ${len} ${
        len === 1 ? 'property' : 'properties'
      } without function ${atLeastOneWithoutFunc.join(' || ')}`
    )
    return
  }

  if ((!window.Worker || amount < 10000 || relations) && !onlyJSON) {
    if (amount > 10000) {
      Alert.info(
        'This browser do not support web workers, generating data on the main thread 🧵'
      )
    }
    const res = generateFakeData(props, amount)
    if (relations) {
      const resWithRelations = res.map((obj) => ({
        ...obj,
        ...relations.reduce(
          (prev, { name, id }) => ({
            ...prev,
            [name]: generateFakeData(relationsProps[id], 10),
          }),
          {}
        ),
      }))
      if (justReturn) {
        return resWithRelations
      }
      downloadData(resWithRelations, name)
    } else {
      if (justReturn) {
        return res
      }
      downloadData(res, name)
    }
  } else {
    spawnWebWorker({ props, amount, modelId, relations, relationsProps })
      .then((result) => {
        const data = result.flat()
        // see https://stackoverflow.com/questions/29175877/json-stringify-throws-rangeerror-invalid-string-length-for-huge-objects
        // stringify-ing the whole array might cause (RangeError: Invalid string length) error
        // which means "Out Of Memory"
        const outJSON = '[' + data.map((el) => toJSONPritty(el)).join(',') + ']'

        saveAs(new Blob([outJSON], { type: 'application/json' }), name)
        Alert.success(`Downloaded ${name}.json 👍`)
      })
      .catch((error) => {
        console.group('Error generating data')
        console.log('the error object')
        console.error(error)
        console.log('you can open an issue with this error in the link below')
        console.log('https://github.com/MohammedAl-Rowad/pollux')
        console.groupEnd()
        Alert.success('Feels bad, we faced an error')
      })
  }
}

/**
 *
 * @param {Array<any>} props
 * @param {number} amount
 */
const generateFakeData = (props, amount) =>
  Array.from({ length: amount }).map(() => {
    return props.reduce(
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
  })

/**
 *
 * @param {Array<any>} data
 * @param {string} name
 */
const downloadData = (data, name) => {
  saveAs(new Blob([toJSONPritty(data)], { type: 'application/json' }), name)
  Alert.success(`Downloaded ${name}.json 👍`)
}

/**
 *
 * @param {Array<any>} data
 */
const toJSONPritty = (data) => JSON.stringify(data, null, 2)

/**
 *
 * @param {objcet} state - redux-state
 * @param {string} modelId - the uuid for the model in redux
 */
export const relationsPropsGetter = (state, modelId) =>
  (state.relations[modelId] || []).reduce(
    (prev, id) => ({ ...prev, [id]: state.prop[id] }),
    {}
  )

/**
 *
 * @param {objcet} state - redux-state
 * @param {string} modelId - the uuid for the model in redux
 */
export const relationsGetter = (state, modelId) =>
  (state.relations[modelId] || []).map((uuid) =>
    state.models.find(({ id }) => uuid === id)
  )

/**
 *
 * @param {string} name - the model name
 * @param {Array<any>} props
 * @param {number} amount
 * @param {Array<any>} relations
 * @param {object} relationsProps
 * @param {Array<any> | undefined} data
 * @param {boolean} auth
 * @param {string} modelId
 */
export const generateAPI = async (
  name,
  props,
  amount,
  relations,
  relationsProps,
  data,
  auth,
  modelId
) => {
  try {
    if (!props && !data) {
      Alert.warning(`plz add some properties to this model (${name})`)
      return
    }
    const zip = new JSZip()
    zip.file('package.json', toJSONPritty(npmCongif(auth)))
    zip.file(
      'db.json',
      toJSONPritty(
        data
          ? data
          : {
              [name]: generate(
                props,
                name,
                amount,
                relations,
                relationsProps,
                true,
                modelId
              ),
            }
      )
    )
    zip.file('README.md', apiReadme(name))
    zip.file('routes.json', toJSONPritty({ [name]: 660 }))
    const zipContent = await zip.generateAsync({ type: 'blob' })
    saveAs(zipContent, 'pollux-api.zip')
    Alert.success(`Downloaded pollux-api.zip 👍`)
  } catch (error) {
    Alert.error(
      'Something went wrong while generating your API, please checkout the console'
    )
    console.group('Error generating the API')
    console.log('the error object')
    console.error(error)
    console.log('you can open an issue with this error in the link below')
    console.log('https://github.com/MohammedAl-Rowad/pollux')
    console.groupEnd()
  }
}
