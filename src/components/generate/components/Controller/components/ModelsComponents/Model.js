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
  Whisper,
  Tooltip,
  Modal,
} from 'rsuite'
import { deleteModel } from '../../../../../../redux/actions'
import { danger } from 'colors'
const { Body, Footer } = Modal

const Model = ({ dispatch, model: { id, name } }) => {
  const delToolTip = (
    <Tooltip>
      Click here to <b>Delete</b> this model {'`'}
      {name}
      {'`'}.
    </Tooltip>
  )
  const [state, setState] = useState({ showConfirmModel: false })
  const closeConfirmModal = () =>
    setState({ ...state, showConfirmModel: false })
  const openConfirmModal = () => setState({ ...state, showConfirmModel: true })
  const del = (id) => {
    closeConfirmModal()
    dispatch(deleteModel(id))
  }

  return (
    <section>
      <PanelGroup bordered accordion>
        <Panel bordered header={`Model name ${name}`}>
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={24} style={{ textAlign: 'right' }}>
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
