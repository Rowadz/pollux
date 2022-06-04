export type RelationsMap = Record<string, string[]>

export type ReduxState = {
  relations: RelationsMap
  prop: FakerPropMap
  models: Model[]
  // TODO remove `?`
  faker?: FakerPolluxReduxStoreState[]
  auth: boolean
}

export type FakerPolluxReduxStoreState = {
  groupName: string
  label: string

  value: string
  //   BIG HMMMMM??? here, WTF is going on?
  parent: any[]
}

export type FakerProp = {
  func: string
  groupName: string
  regex?: string
  id: string
  propName: string
}

export type FakerPropMap = Record<string, FakerProp[]>

export type Relation = {
  amount: number
  createdAt: number
  id: string
  name: string
}

// alias
export type Model = Relation

export type RelationProps = Record<string, FakerProp[]>
