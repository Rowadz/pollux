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
const { Body, Footer } = Modal

const delToolTip = (
  <Tooltip>
    Click here to <b>Delete</b> this model.
  </Tooltip>
)

const Model = ({ dispatch, model: { id, name } }) => {
  const [state, setState] = useState({ showConfirmModel: false })
  const closeConfirmModal = () =>
    setState({ ...state, showConfirmModel: false })
  const openConfirmModal = () => setState({ ...state, showConfirmModel: true })
  const del = (id) => dispatch(deleteModel(id))

  return (
    <section>
      <PanelGroup bordered>
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
                    <b>Are you sure you want to delete this model ?</b>
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
