// @ts-ignore
import { jsonToSchema } from '@walmartlabs/json-to-simple-graphql-schema/lib'
// @ts-ignore
import { formatSdl } from 'format-graphql'
import { FakerProp } from 'components/shared'
import {
  generate,
  relationsGetter,
  relationsPropsGetter,
} from 'components/generate/components/Controller/util'
import { FakerPropMap, Model, RelationsMap } from './types'
import { Alert } from 'rsuite'

export const toGraphQl = (modelProps: FakerProp[] | null | undefined) => {
  if (!modelProps || !modelProps.length) {
    Alert.warning('Pelase add some attributes to the model.')
    return ''
  }
  // prettier-ignore
  const [fakeObj] = generate(modelProps, 'TO_GRAPH_QL', 1, [], {}, true, '') as {}[]
  const fakeJSON = JSON.stringify(fakeObj)
  const graphQlStr: string = formatSdl(
    jsonToSchema({ jsonInput: fakeJSON }).value
  )
  return graphQlStr.replaceAll('id: String', 'id: ID')
}

export const toGraphQlManyModels = (
  models: Model[],
  prop: FakerPropMap,
  relations: RelationsMap
) => {
  const fakeData = models.reduce(
    (prev, { name, id }) => ({
      ...prev,
      // fuck me that's ugly
      [name]: generate(
        prop[id],
        name,
        1,
        relationsGetter({ relations, models }, id),
        relationsPropsGetter({ relations, prop }, id),
        true,
        id,
        false,
        1
      ),
    }),
    {}
  )

  if (!Object.keys(fakeData).length) {
    Alert.warning('Pelase add some models first.')
    return ''
  }
  const fakeJSON = JSON.stringify(fakeData)
  const graphqlStr: string = formatSdl(
    jsonToSchema({ jsonInput: fakeJSON }).value
  )
  return graphqlStr.replaceAll('id: String', 'id: ID')
}
