export type FakerPolluxReduxStoreState = {
  groupName: string
  label: string
  value: string
  //   BIG HMMMMM??? here, WTF is going on?
  parent: any[]
}

type FakerProp = {
  func: string
  groupName: string
  id: string
  propName: string
}

type Relation = {
  amount: number
  createdAt: number
  id: string
  name: string
}

type RelationProp = Record<string, Relation>

export type ModelHeaderProps = {
  id: string
  name: string
  isTourOpen: boolean
  propsCount: number
  props: FakerProp[]
  amount: number
  relations: Relation[]
  relationsProps: RelationProp
  auth: boolean
  checkedModels: Set<string>
  disableModalControllers: boolean
  openCreateRelModal: () => void
  faker: FakerPolluxReduxStoreState[]
}
