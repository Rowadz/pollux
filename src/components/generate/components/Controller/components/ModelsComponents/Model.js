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
  Badge,
} from 'rsuite'
import ConfirmDel from './ConfirmDel'
import PropsDisplay from './PropsDisplay'
import AddProp from './AddProp'
import { normal } from 'colors'

import { deleteModel, addPropName, removeAllProps } from 'redux/actions'

const Model = ({ dispatch, model: { id, name }, propsCount }) => {
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
  const closeConfirmModal = () =>
    setState({ ...state, showConfirmModal: false, showPropNameModal: false })
  const openConfirmModal = () => {
    console.log('d')
    setState({ ...state, showConfirmModal: true })
  }
  const openPropNameModal = () =>
    setState({ ...state, showConfirmModal: false, showPropNameModal: true })

  const del = (id) => {
    closeConfirmModal()
    dispatch(removeAllProps(id))
    dispatch(deleteModel(id))
  }

  const addProp = (name) => dispatch(addPropName({ propName: name, uuid: id }))
  const dynamicHeder = (
    <div>
      Model name {name}
      {
        <Badge
          content={propsCount}
          style={{ marginLeft: '5px', background: normal }}
        />
      }
    </div>
  )
  return (
    <section>
      <PanelGroup bordered accordion>
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
              <Col xs={24} sm={24} md={24} style={{ textAlign: 'right' }}>
                <PropsDisplay id={id} />
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
}))(Model)
