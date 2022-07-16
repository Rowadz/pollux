import React, { useState } from 'react'
import { IconButton, Modal, Button, Input } from 'rsuite'
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

  const onEnter = () => {
    inputChange(state.modelName)
    create()
  }
  return (
    <section>
      <IconButton
        id="add-prototype-btn"
        color="cyan"
        onClick={showNameModal}
        appearance="ghost"
        style={{ width: '100%' }}
        icon={<></>}
      >
        Add a model
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

export default connect()(AddModelBtn)
