import React, { useState } from 'react'
import { IconButton, Icon, Modal, Button, Divider } from 'rsuite'
import { Alert } from 'rsuite'
const { Header, Body, Footer, Title } = Modal

export default function LoadModel() {
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
  const load = (model) => {
    console.log(model)
  }
  return (
    <section style={{ display: 'inline', marginLeft: 10 }}>
      <IconButton
        color="yellow"
        onClick={open}
        circle
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
          {state.models.map((m, i) => (
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
          ))}
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
