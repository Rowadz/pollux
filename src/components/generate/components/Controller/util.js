import { Alert } from 'rsuite'
import * as faker from 'faker'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import npmCongif from '../../../../zipFileContent/package.json'
import apiReadme from '../../../../zipFileContent/readme.md'

/**
 *
 * @param {Array<any>} props
 * @param {string} name
 * @param {number} amount
 * @param {Array<any>} relations
 * @param {object} relationsProps
 * @param {boolean} justReturn
 */
export const generate = (
  props,
  name,
  amount,
  relations,
  relationsProps,
  justReturn
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
  const res = generateFakeData(props, amount)
  if (relations) {
    const relData = relations.reduce(
      (prevObj, { id, name, amount }) => ({
        ...prevObj,
        [name]: generateFakeData(relationsProps[id], amount),
      }),
      {}
    )
    const resWithRelations = res.map((obj) => ({ ...obj, ...relData }))
    // const resWithRelations = res.map((obj) => ({
    //   ...obj,
    //   ...relations.reduce(
    //     (prev, { name, id }) => ({
    //       ...prev,
    //       [name]: generateFakeData(relationsProps[id]),
    //     }),
    //     {}
    //   ),
    // }))
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
}

/**
 *
 * @param {Array<any>} props
 * @param {number} amount
 */
const generateFakeData = (props, amount) =>
  Array.from({ length: amount }).map(() => {
    return props.reduce((prev, { propName, groupName, func }) => {
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
      return {
        ...prev,
        [propName]: faker[groupName][func === 'fullName' ? 'findName' : func](),
      }
    }, {})
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
 */
export const generateAPI = async (
  name,
  props,
  amount,
  relations,
  relationsProps,
  data
) => {
  try {
    if (!props && !data) {
      Alert.warning(`plz add some properties to this model (${name})`)
      return
    }
    const zip = new JSZip()
    zip.file('package.json', toJSONPritty(npmCongif))
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
                true
              ),
            }
      )
    )
    zip.file('README.md', apiReadme(name))
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
