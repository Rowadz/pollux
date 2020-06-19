import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Icon,
  IconButton,
  Panel,
  Button,
  PanelGroup,
  Grid,
  Row,
  Col,
  Input,
  Whisper,
  Tooltip,
  Modal,
} from 'rsuite'
import { deleteModel, addPropName } from 'redux/actions'
import { danger } from 'colors'
const { Body, Footer, Header, Title } = Modal

const Model = ({ dispatch, model: { id, name } }) => {
  const [state, setState] = useState({
    showConfirmModel: false,
    showPropName: false,
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
    setState({ ...state, showConfirmModel: false, showPropName: false })
  const openConfirmModal = () => setState({ ...state, showConfirmModel: true })
  const openPropNameModal = () =>
    setState({ ...state, showConfirmModel: false, showPropName: true })
  const del = (id) => {
    closeConfirmModal()
    dispatch(deleteModel(id))
  }

  const addProp = (name) => dispatch(addPropName(name))

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
                <Modal
                  backdrop="static"
                  show={state.showConfirmModel}
                  onHide={closeConfirmModal}
                  size="xs"
                >
                  <Header>
                    <Title>Confirm</Title>
                  </Header>
                  <Body>
                    <Icon
                      icon="remind"
                      style={{
                        color: '#ffb300',
                        fontSize: 24,
                      }}
                    />
                    <b>
                      {' '}
                      Are you sure you want to delete this model {'`'}
                      <span style={{ color: danger }}>{name}</span>
                      {'`'}?
                    </b>
                  </Body>
                  <Footer>
                    <Button
                      onClick={() => del(id)}
                      appearance="primary"
                      color="red"
                    >
                      Ok
                    </Button>
                    <Button onClick={closeConfirmModal} appearance="subtle">
                      Cancel
                    </Button>
                  </Footer>
                </Modal>
                <Modal
                  backdrop="static"
                  show={state.showPropName}
                  onHide={closeConfirmModal}
                  size="md"
                >
                  <Header>
                    <Title>
                      Please enter the property name, you can change that later{' '}
                    </Title>
                  </Header>
                  <Body>
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Enter prop name"
                    />
                  </Body>
                  <Footer>
                    <Button
                      // onClick={() => addProp(id)}
                      appearance="primary"
                      color="cyan"
                    >
                      Ok
                    </Button>
                    <Button onClick={closeConfirmModal} appearance="subtle">
                      Cancel
                    </Button>
                  </Footer>
                </Modal>
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
