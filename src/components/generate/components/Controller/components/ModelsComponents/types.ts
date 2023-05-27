import type {
  FakerPolluxReduxStoreState,
  RelationProps,
  FakerProp,
  Relation,
} from 'components/shared'
import { generate, generateGraphqlAPI } from '../../util'

export type ModelHeaderProps = {
  id: string
  name: string
  isTourOpen: boolean
  propsCount: number
  props: FakerProp[]
  amount: number
  relations: Relation[]
  relationsProps: RelationProps
  auth: boolean
  checkedModels: Set<string>
  generate: (justReturn?: boolean) => ReturnType<typeof generate>
  generateGraphQl: () => ReturnType<typeof generateGraphqlAPI>
  disableModalControllers: boolean
  openCreateRelModal: () => void
  faker: FakerPolluxReduxStoreState[]
}

export type Lang = 'ruby' | 'php' | 'python' | 'javascript' | 'sql'
