import React, { useState } from 'react'
import { IconButton, Icon, Modal, Button, Checkbox } from 'rsuite'
import { connect } from 'react-redux'
import emptySave from './emptySave.svg'
import { Alert } from 'rsuite'
const { Header, Body, Footer, Title } = Modal

export default function LoadModel() {
  const [state, setState] = useState({ showTheModalOfModels: false })
  const close = () => setState({ ...state, showTheModalOfModels: false })
  return (
    <section style={{ display: 'inline', marginLeft: 10 }}>
      <IconButton
        color="yellow"
        onClick={() => setState({ ...state, showTheModalOfModels: true })}
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
        <Body></Body>
        <Footer>
          <Button onClick={close} appearance="subtle">
            Close
          </Button>
        </Footer>
      </Modal>
    </section>
  )
}
