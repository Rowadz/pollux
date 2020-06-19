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
} from 'rsuite'
import ConfirmDel from './ConfirmDel'
import AddProp from './AddProp'

import { deleteModel, addPropName, removeAllProps } from 'redux/actions'

const Model = ({ dispatch, model: { id, name } }) => {
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

  return (
    <section>
      <PanelGroup bordered accordion>
        <Panel bordered header={`Model name ${name}`}>
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
            </Row>
          </Grid>
        </Panel>
      </PanelGroup>
    </section>
  )
}

export default connect((dispatch, ownProps) => ({ ...ownProps, dispatch }))(
  Model
)
