import React, { useState } from 'react'
import { IconButton, Icon, Modal, Button, Divider } from 'rsuite'
import { connect } from 'react-redux'
import { Alert } from 'rsuite'
import loadModelsEmpty from './loadModels.svg'
import { addModel, justAddProp } from 'redux/actions'
const { Header, Body, Footer, Title } = Modal

const LoadModel = ({ dispatch, models }) => {
  const [state, setState] = useState({
    showTheModalOfModels: false,
    models: [],
  })
  const close = () => setState({ ...state, showTheModalOfModels: false })
  const open = () =>
    setState({
      ...state,
      showTheModalOfModels: true,
      models: JSON.parse(localStorage.getItem('models')) || [],
    })
  const load = ({ id, name, createdAt, amount, ...props }) => {
    // check if we already loaded the model
    if ((models.find(({ id: modelId }) => id === modelId) || []).length === 0) {
      dispatch(addModel({ id, name, createdAt, amount: +amount }))
      dispatch(justAddProp({ uuid: id, ...props }))
      Alert.info(`Loaded ${name} model 👍`)
    } else {
      Alert.warning(`We already loaded ${name} - id[${id}]`)
    }
  }
  return (
    <section style={{ display: 'inline', marginLeft: 10 }}>
      <IconButton
        color="yellow"
        onClick={open}
        circle
        id="load-model-btn"
        icon={<Icon icon="tasks" />}
      />
      <Modal
        show={state.showTheModalOfModels}
        onHide={close}
        style={{ maxWidth: '100%' }}
      >
        <Header>
          <Title>Load your saved models!</Title>
        </Header>
        <Body>
          {state.models.length === 0 ? (
            <div style={{ textAlign: 'center' }}>
              <img
                src={loadModelsEmpty}
                height="240"
                width={'100%'}
                alt="empty models"
              />
              <p>Your saved models will appear here!</p>
            </div>
          ) : (
            state.models.map((m, i) => (
              <div key={i}>
                <h3>
                  <strong>{m.name}</strong>
                </h3>
                <Button
                  style={{ float: 'right' }}
                  appearance="ghost"
                  onClick={() => load(m)}
                >
                  Click to Load {m.name}
                </Button>
                <pre>{JSON.stringify(m, null, 2)}</pre>
                <Divider />
              </div>
            ))
          )}
        </Body>
        <Footer>
          <Button onClick={close} appearance="subtle">
            Close
          </Button>
        </Footer>
      </Modal>
    </section>
  )
}

export default connect(({ models }, ownProps) => ({
  ...ownProps,
  models,
}))(LoadModel)
