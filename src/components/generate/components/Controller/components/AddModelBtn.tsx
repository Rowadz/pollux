import React, { useState } from 'react'
import { IconButton, Icon, Modal, Button, Input } from 'rsuite'
import { useDispatch } from 'react-redux'
import { addModel } from 'redux/actions'
import { v4 } from 'uuid'

const { Header, Body, Footer, Title } = Modal

const AddModelBtn = () => {
  const [state, setState] = useState({ showNameModal: false, modelName: '' })
  const dispatch = useDispatch()
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

  const inputChange = (str: string) =>
    setState({ ...state, modelName: str.trim() })

  const onEnter = () => {
    inputChange(state.modelName)
    create()
  }
  return (
    <section>
      <ol>
        <li>Click on "Add a model"</li>
        <li>Click on "Builder"</li>
        <li>Drag and drop and functions</li>
        <li>Generate data</li>
      </ol>
      <IconButton
        id="add-prototype-btn"
        color="cyan"
        onClick={showNameModal}
        appearance="primary"
        style={{ width: '100%' }}
        icon={<Icon icon="plus" />}
      >
        <b>Add a model</b>
      </IconButton>
      <Modal
        show={state.showNameModal}
        onHide={close}
        style={{ maxWidth: '100%' }}
      >
        <Header>
          <Title>Choose the model name</Title>
        </Header>
        <Body>
          <p>
            Click <span className="note">`Enter`</span> to create the model or
            <span className="note">`esc`</span> to close this model
          </p>
          <Input
            onPressEnter={onEnter}
            onChange={inputChange}
            autoFocus={true}
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

export default AddModelBtn
