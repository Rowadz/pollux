import React, { useState, useEffect, memo, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useMount } from 'react-use'
import { Flipper, Flipped } from 'react-flip-toolkit'
import { Icon, IconButton, Panel, PanelGroup, Grid, Row, Col } from 'rsuite'
import ConfirmDel from './ConfirmDel'
import PropsDisplay from './PropsDisplay'
import CreateRel from './CreateRel'
import { generate, generateGraphqlAPI } from '../../util'
import { deleteModel, removeAllProps, updateAmount } from 'redux/actions'
import WebWorkerProgress from './WebWorkerProgress'
import { eventEmitter } from 'components/generate/webWorker/eventEmitter'
import ModelHeader from './ModelHeader'

import {
  FakerPolluxReduxStoreState,
  FakerProp,
  Model as ModelType,
  ReduxState,
  selectAuth,
  selectCheckedModels,
  selectFakerList,
  selectProps,
  selectPropsCount,
  selectRelations,
  selectRelationsProps,
} from 'components/shared'
import ModelSubHeader from './ModelSubHeader'

const Model = ({
  model: { id, name, amount },
  isTourOpen,
}: {
  model: ModelType
  isTourOpen: boolean
}) => {
  const [fullScreen, setFullScreen] = useState(false)
  const dispatch = useDispatch()

  const propsCount: number = useSelector(
    (state: ReduxState) => selectPropsCount(state, id),
    shallowEqual
  )

  const props: FakerProp[] = useSelector(
    (state: ReduxState) => selectProps(state, id),
    shallowEqual
  )

  const faker: FakerPolluxReduxStoreState[] = useSelector(
    selectFakerList,
    shallowEqual
  )

  const checkedModels: Set<string> = useSelector((state: ReduxState) =>
    selectCheckedModels(state as any, id)
  )

  const auth: boolean = useSelector(selectAuth)

  const relations = useSelector((state: ReduxState) =>
    selectRelations(state, id)
  )

  const relationsProps = useSelector(
    (state: ReduxState) => selectRelationsProps(state, id),
    shallowEqual
  )

  const [state, setState] = useState({
    showConfirmModal: false,
    showPropNameModal: false,
    showCreateRel: false,
    amount: 10,
  })

  const generateProxy = useCallback(
    (justReturn: boolean = false) => {
      return generate(
        props,
        name,
        amount,
        relations,
        relationsProps,
        justReturn,
        id,
        false
      )
    },
    [props, name, amount, relations, relationsProps, id]
  )

  const generateGraphqlAPIProxy = useCallback(
    () =>
      generateGraphqlAPI(name, props, amount, relations, relationsProps, id),
    [name, props, amount, relations, relationsProps, id]
  )

  useMount(() => {
    setFullScreen((prevState) => !prevState)
  })

  const [disableModalControllers, setDisableModalControllers] = useState(false)

  useEffect(() => {
    eventEmitter.on('STARTED', () => {
      setDisableModalControllers(true)
    })
    eventEmitter.on(
      'STOPPED',
      (() => {
        const maxWorkers = navigator.hardwareConcurrency || 4
        let counter = 0
        return () => {
          counter++
          // means that all the workers are done
          if (counter === maxWorkers) {
            setDisableModalControllers(false)
            counter = 0
          }
        }
      })()
    )
  }, [])

  const closeConfirmModal = () =>
    setState({
      ...state,
      showConfirmModal: false,
      showPropNameModal: false,
      showCreateRel: false,
    })
  const openConfirmModal = () =>
    setState({ ...state, showConfirmModal: true, showCreateRel: false })

  const openCreateRelModal = () =>
    setState({
      ...state,
      showConfirmModal: false,
      showPropNameModal: false,
      showCreateRel: true,
    })

  const del = (id: string) => {
    closeConfirmModal()
    dispatch(removeAllProps(id))
    dispatch(deleteModel(id))
  }

  const changeAmount = useCallback(
    (val: string | number) => {
      setState((prev) => ({ ...prev, amount: +val }))
      dispatch(updateAmount({ modelId: id, amount: val as string }))
    },
    [setState, dispatch, id]
  )

  return (
    <Flipper flipKey={fullScreen}>
      <Flipped flipId="square-model">
        <section
          style={{
            marginTop: 20,
            ...(fullScreen
              ? { width: '100%', height: '100%' }
              : { width: 0, height: 0 }),
          }}
        >
          <PanelGroup bordered>
            <Panel
              shaded
              header={
                <ModelHeader
                  amount={amount}
                  generate={generateProxy}
                  generateGraphQl={generateGraphqlAPIProxy}
                  id={id}
                  auth={auth}
                  checkedModels={checkedModels}
                  disableModalControllers={disableModalControllers}
                  faker={faker}
                  isTourOpen={isTourOpen}
                  name={name}
                  openCreateRelModal={openCreateRelModal}
                  props={props}
                  propsCount={propsCount}
                  relations={relations}
                  relationsProps={relationsProps}
                />
              }
            >
              <Grid fluid>
                <Row>
                  <ModelSubHeader
                    amount={amount}
                    modelName={name}
                    changeAmount={changeAmount}
                    disableModalControllers={disableModalControllers}
                    generate={generateProxy}
                    isTourOpen={isTourOpen}
                    modelId={id}
                  />
                  <Col xs={24} sm={24} md={24}>
                    <WebWorkerProgress modelId={id} relations={relations} />

                    <IconButton
                      icon={<Icon icon="minus" />}
                      style={{ float: 'right' }}
                      color="red"
                      disabled={disableModalControllers}
                      size="xs"
                      circle
                      onClick={openConfirmModal}
                    />
                    <ConfirmDel
                      id={id}
                      del={del}
                      closeConfirmModal={closeConfirmModal}
                      name={name}
                      showConfirmModal={state.showConfirmModal}
                    />

                    {isTourOpen ? (
                      ''
                    ) : (
                      <CreateRel
                        showCreateRel={state.showCreateRel}
                        id={id}
                        close={closeConfirmModal}
                      />
                    )}
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    style={{ textAlign: 'right', marginTop: '10px' }}
                  >
                    <PropsDisplay
                      id={id}
                      modelName={name}
                      disableModalControllers={disableModalControllers}
                    />
                  </Col>
                </Row>
              </Grid>
            </Panel>
          </PanelGroup>
        </section>
      </Flipped>
    </Flipper>
  )
}

export default memo(Model)
