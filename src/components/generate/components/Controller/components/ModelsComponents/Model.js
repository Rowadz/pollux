import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Icon,
  IconButton,
  Panel,
  PanelGroup,
  Grid,
  Row,
  Col,
  Whisper,
  Tooltip,
  Tag,
  InputNumber,
  Alert,
} from 'rsuite'
import ConfirmDel from './ConfirmDel'
import PropsDisplay from './PropsDisplay'
import AddProp from './AddProp'
import * as faker from 'faker'
import { saveAs } from 'file-saver'

import { deleteModel, addPropName, removeAllProps } from 'redux/actions'

const Model = ({ dispatch, model: { id, name }, propsCount, props }) => {
  const [state, setState] = useState({
    showConfirmModal: false,
    showPropNameModal: false,
  })
  const delToolTip = (
    <Tooltip>
      Click here to <b>Delete</b> this model {'`'}
      {name}
      {'`'}.
    </Tooltip>
  )
  const addKeyTip = <Tooltip>Click here to add an attribute.</Tooltip>
  const generateTip = (
    <Tooltip>
      Click here to <b>generate</b> a json for this model.
    </Tooltip>
  )
  const closeConfirmModal = () =>
    setState({ ...state, showConfirmModal: false, showPropNameModal: false })
  const openConfirmModal = () => setState({ ...state, showConfirmModal: true })
  const openPropNameModal = () =>
    setState({ ...state, showConfirmModal: false, showPropNameModal: true })

  const del = (id) => {
    closeConfirmModal()
    dispatch(removeAllProps(id))
    dispatch(deleteModel(id))
  }

  const generate = (ammount = 10) => {
    if (!props) {
      Alert.warning(`plz add some properties to this model (${name})`)
      return
    }
    const atLeastOneWithoutFunc = props
      .filter(({ func }) => !func)
      .map(({ propName }) => propName)
    const len = atLeastOneWithoutFunc.length
    if (len > 0) {
      console.log(atLeastOneWithoutFunc)
      Alert.warning(
        `There is ${len} ${
          len === 1 ? 'property' : 'properties'
        } without function ${atLeastOneWithoutFunc.join(' || ')}`
      )
      return
    }
    const res = Array.from({ length: ammount }).map(() => {
      return props.reduce(
        (prev, { propName, groupName, func }) => ({
          ...prev,
          [propName]: faker[groupName][func](),
        }),
        {}
      )
    })
    saveAs(
      new Blob([JSON.stringify(res, null, 2)], { type: 'application/json' }),
      name
    )
  }

  const addProp = (name) => dispatch(addPropName({ propName: name, uuid: id }))
  const dynamicHeder = (
    <div>
      Model name {name}
      {
        <Tag color="cyan" style={{ marginLeft: '5px' }}>
          {propsCount}
        </Tag>
      }
    </div>
  )
  return (
    <section>
      <PanelGroup bordered>
        <Panel shaded header={dynamicHeder}>
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={24} style={{ textAlign: 'right' }}>
                <Whisper placement="right" trigger="hover" speaker={addKeyTip}>
                  <IconButton
                    style={{ float: 'left' }}
                    icon={<Icon icon="plus" />}
                    color="cyan"
                    circle
                    onClick={openPropNameModal}
                  />
                </Whisper>
                <Whisper
                  placement="right"
                  trigger="hover"
                  speaker={generateTip}
                >
                  <IconButton
                    style={{ float: 'left', marginLeft: '5px' }}
                    icon={<Icon icon="magic2" />}
                    color="orange"
                    circle
                    onClick={() => generate()}
                  />
                </Whisper>
                <div style={{ width: 100, display: 'flex', paddingLeft: 10 }}>
                  <InputNumber defaultValue={10} max={1000} min={1} />
                </div>
                <Whisper placement="left" trigger="hover" speaker={delToolTip}>
                  <IconButton
                    icon={<Icon icon="minus" />}
                    color="red"
                    circle
                    onClick={openConfirmModal}
                  />
                </Whisper>
                <ConfirmDel
                  id={id}
                  del={del}
                  closeConfirmModal={closeConfirmModal}
                  name={name}
                  showConfirmModal={state.showConfirmModal}
                />
                <AddProp
                  id={id}
                  showPropNameModal={state.showPropNameModal}
                  closeConfirmModal={closeConfirmModal}
                  name={name}
                  addProp={addProp}
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                style={{ textAlign: 'right', marginTop: '10px' }}
              >
                <PropsDisplay id={id} modelName={name} />
              </Col>
            </Row>
          </Grid>
        </Panel>
      </PanelGroup>
    </section>
  )
}

export default connect((state, ownProps) => ({
  ...ownProps,
  propsCount: (state.prop[ownProps.model.id] || []).length,
  props: state.prop[ownProps.model.id],
}))(Model)
