import React, { useState } from 'react'
import { IconButton, Icon, Modal, Button, Input } from 'rsuite'
import { connect } from 'react-redux'
import { addModel } from 'redux/actions'
import { v4 } from 'uuid'

const { Header, Body, Footer, Title } = Modal

const AddModelBtn = ({ dispatch }) => {
  const [state, setState] = useState({ showNameModal: false, modelName: '' })
  const showNameModal = () => setState({ ...state, showNameModal: true })
  const close = () => setState({ ...state, showNameModal: false })
  const create = () => {
    dispatch(
      addModel({
        id: v4(),
        name: state.modelName,
        createdAt: +new Date(),
      })
    )
    setState({ ...state, modelName: '', showNameModal: false })
  }
  /**
   * @param {string} str
   */
  const inputChange = (str) => setState({ ...state, modelName: str.trim('') })
  return (
    <section>
      <IconButton
        color="cyan"
        onClick={showNameModal}
        appearance="ghost"
        style={{ width: '100%' }}
        icon={<Icon icon="plus" />}
      >
        Add a model prototype
      </IconButton>
      <Modal show={state.showNameModal} onHide={close}>
        <Header>
          <Title>Choose the model name</Title>
        </Header>
        <Body>
          <Input
            onChange={inputChange}
            style={{ width: '100%' }}
            placeholder="Your model name"
            size="lg"
            value={state.modelName}
          />
        </Body>
        <Footer>
          <Button onClick={create} appearance="primary">
            Create
          </Button>
          <Button onClick={close} appearance="subtle">
            Cancel
          </Button>
        </Footer>
      </Modal>
    </section>
  )
}

export default connect()(AddModelBtn)
