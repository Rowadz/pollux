import type {
  FakerPolluxReduxStoreState,
  RelationProps,
  FakerProp,
  Relation,
} from 'components/shared'

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
  disableModalControllers: boolean
  openCreateRelModal: () => void
  faker: FakerPolluxReduxStoreState[]
}
