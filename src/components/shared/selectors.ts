import { createSelector } from 'reselect'
import {
  FakerPolluxReduxStoreState,
  FakerPropMap,
  Model,
  ReduxState,
  Relation,
  RelationsMap,
} from './types'

export const selectModel = createSelector(
  [
    (state: ReduxState) => state.models,
    (_: Model[], modelId: string) => modelId,
  ],
  (models: Model[], modelId: string) =>
    models.filter(({ id }) => id === modelId)[0] as Model
)

export const selectProps = createSelector(
  [
    (state: ReduxState) => state.prop,
    (_: ReduxState, modelId: string) => modelId,
  ],
  (propsMap: FakerPropMap, modelId: string) => propsMap[modelId]
)

type RealtionsMaps = { relations: RelationsMap; models: Model[] }

export const selectRelations = createSelector(
  (state: ReduxState) => ({ relations: state.relations, models: state.models }),
  (_: RealtionsMaps, modelId: string) => modelId,
  (state: RealtionsMaps, modelId: string) =>
    (state.relations[modelId] || []).map((uuid) =>
      state.models.find(({ id }) => uuid === id)
    ) as Relation[]
)

type RealtionsPropsMap = { relations: RelationsMap; prop: FakerPropMap }

export const selectRelationsProps = createSelector(
  (state: ReduxState) => ({ relations: state.relations, prop: state.prop }),
  (_: RealtionsPropsMap, modelId: string) => modelId,
  (state: RealtionsPropsMap, modelId: string) =>
    (state.relations[modelId] || []).reduce(
      (prev, id) => ({ ...prev, [id]: state.prop[id] }),
      {}
    ) as FakerPropMap
)

export const selectPropsCount = createSelector(
  (state: ReduxState) => state.prop,
  (_: ReduxState, modelId: string) => modelId,
  (fakerPropMap: FakerPropMap, modelId: string) =>
    fakerPropMap[modelId]?.length || 0
)

export const selectCheckedModels = createSelector(
  (state: ReduxState) => state.relations,
  (_: RelationsMap, modelId: string) => modelId,
  (relationsMap: RelationsMap, modelId: string) =>
    new Set(relationsMap[modelId] || [])
)

export const selectFakerList = (state: ReduxState) =>
  state.faker as FakerPolluxReduxStoreState[]

export const selectAuth = (state: ReduxState) => state.auth
