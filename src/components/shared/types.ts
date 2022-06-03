export type ReduxState = {
  relations: Record<string, string[]>
  prop: Record<string, FakerProp>
  models: Relation[]
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

export type Relation = {
  amount: number
  createdAt: number
  id: string
  name: string
}

export type RelationProps = Record<string, FakerProp[]>
