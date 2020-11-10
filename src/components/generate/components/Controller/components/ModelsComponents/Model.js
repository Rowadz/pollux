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
} from 'rsuite'
import ConfirmDel from './ConfirmDel'
import PropsDisplay from './PropsDisplay'
import AddProp from './AddProp'
import CreateRel from './CreateRel'
import {
  generate,
  relationsPropsGetter,
  relationsGetter,
  generateAPI,
} from '../../util'

import {
  deleteModel,
  addPropName,
  removeAllProps,
  updateAmount,
} from 'redux/actions'

const Model = ({
  dispatch,
  model: { id, name, amount },
  propsCount,
  props,
  relations,
  relationsProps,
  isTourOpen,
}) => {
  const [state, setState] = useState({
    showConfirmModal: false,
    showPropNameModal: false,
    showCreateRel: false,
    amount: 10,
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
    setState({
      ...state,
      showConfirmModal: false,
      showPropNameModal: false,
      showCreateRel: false,
    })
  const openConfirmModal = () =>
    setState({ ...state, showConfirmModal: true, showCreateRel: false })
  const openPropNameModal = () =>
    setState({
      ...state,
      showConfirmModal: false,
      showCreateRel: false,
      showPropNameModal: true,
    })

  const openCreateRelModal = () =>
    setState({
      ...state,
      showConfirmModal: false,
      showPropNameModal: false,
      showCreateRel: true,
    })

  const del = (id) => {
    closeConfirmModal()
    dispatch(removeAllProps(id))
    dispatch(deleteModel(id))
  }

  const changeAmount = (val) => {
    setState({ ...state, amount: +val })
    dispatch(updateAmount({ modelId: id, amount: +val }))
  }

  const addProp = (name) => dispatch(addPropName({ propName: name, uuid: id }))

  const dynamicHeder = (
    <div>
      Model name {name}
      {
        <Tag
          color="cyan"
          style={{ marginLeft: '5px' }}
          id={isTourOpen ? 'prop-tag-count' : null}
        >
          {propsCount}
        </Tag>
      }
      <Whisper
        placement="right"
        trigger="hover"
        speaker={
          <Tooltip>
            Click here to create a relationship with other models
          </Tooltip>
        }
      >
        <IconButton
          id={isTourOpen ? 'create-a-relationship-btn' : null}
          icon={<Icon icon="link" />}
          style={{ marginLeft: '5px' }}
          color="violet"
          onClick={openCreateRelModal}
          circle
        />
      </Whisper>
      <Whisper
        placement="right"
        trigger="hover"
        speaker={
          <Tooltip>
            Click here to generate a json-server API from this model
          </Tooltip>
        }
      >
        <IconButton
          id={isTourOpen ? 'create-a-api-btn' : null}
          icon={<Icon icon="twinkle-star" />}
          style={{ marginLeft: '5px' }}
          color="blue"
          circle
          onClick={() =>
            generateAPI(name, props, amount, relations, relationsProps)
          }
        />
      </Whisper>
    </div>
  )
  return (
    <section>
      <PanelGroup bordered>
        <Panel shaded header={dynamicHeder}>
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={24}>
                <Whisper placement="right" trigger="hover" speaker={addKeyTip}>
                  <IconButton
                    icon={<Icon icon="plus" />}
                    id={isTourOpen ? 'add-attribute-btn' : null}
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
                    id={isTourOpen ? 'generate-data-btn' : null}
                    style={{ marginLeft: '5px' }}
                    icon={<Icon icon="magic2" />}
                    color="orange"
                    circle
                    onClick={() =>
                      generate(props, name, amount, relations, relationsProps)
                    }
                  />
                </Whisper>
                <div
                  style={{
                    width: 100,
                    display: 'inline',
                    position: 'absolute',
                    paddingLeft: 10,
                  }}
                >
                  <InputNumber
                    defaultValue={amount}
                    max={500}
                    min={1}
                    onChange={changeAmount}
                  />
                </div>
                <Whisper placement="left" trigger="hover" speaker={delToolTip}>
                  <IconButton
                    icon={<Icon icon="minus" />}
                    style={{ float: 'right' }}
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
  relations: relationsGetter(state, ownProps.model.id),
  relationsProps: relationsPropsGetter(state, ownProps.model.id),
}))(Model)
