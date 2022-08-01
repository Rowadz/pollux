import React, { useState, useLayoutEffect } from 'react'
import { Input, TagPicker, Button, Modal, Message } from 'rsuite'
import { connect } from 'react-redux'
import { editProp } from 'redux/actions'

const { Body, Footer, Header, Title } = Modal

const AddProp = ({
  showPropNameModal,
  closeConfirmModal,
  name,
  addProp,
  propNamesForThisModel,
  id,
  mode,
  propNameProp,
  dispatch,
  propId,
}) => {
  const [state, setState] = useState({
    propName: mode === 'edit' ? propNameProp : '',
    valid: true,
  })

  useLayoutEffect(() => {
    if (showPropNameModal && mode !== 'edit') {
      queueMicrotask(() => {
        document.querySelector('.properties-tag-picker').click()
        document.querySelector('.properties-tag-picker input').focus()
      })
    }
  }, [showPropNameModal, mode])

  const inputChange = (strOrArrayOfStrings) => {
    if (mode === 'edit') {
      setState({ propName: strOrArrayOfStrings.trim(''), valid: true })
    } else {
      setState({ propName: strOrArrayOfStrings, valid: true })
    }
  }
  const addButtonClick = () => {
    if (propNamesForThisModel) {
      const exists = propNamesForThisModel.find(
        ({ propName }) => propName === state.propName
      )
      if (exists) {
        setState({ ...state, valid: false })
        return
      }
    }
    if (mode === 'edit')
      dispatch(editProp({ propName: state.propName, id, propId }))
    else {
      state.propName.forEach((name) => addProp(name))
      setState({ ...state, propName: '' })
    }
    closeConfirmModal()
  }
  const close = () => {
    setState({ ...state, valid: true })
    closeConfirmModal()
  }
  return (
    <Modal
      backdrop="static"
      show={showPropNameModal}
      onHide={close}
      style={{ maxWidth: '100%' }}
      size="lg"
    >
      <Header>
        <Title>
          {mode === 'edit'
            ? `Edit ${propNameProp} property`
            : 'Enter the properties names'}
        </Title>
      </Header>
      <Body>
        <div
          style={{
            display: state.valid ? 'none' : 'block',
            marginBottom: '10px',
          }}
        >
          <Message
            type="error"
            showIcon
            description={`The Property "${state.propName}" is already exists in this model (${name})`}
          />
        </div>
        <p style={{ marginBottom: '1rem' }}>
          <b>
            Type the prop name then press <span className="note">`Enter`</span>{' '}
            to add them
          </b>
        </p>
        {mode === 'edit' ? (
          <Input
            style={{ width: '100%' }}
            placeholder="Change prop name"
            onChange={inputChange}
          />
        ) : (
          <TagPicker
            className="properties-tag-picker"
            creatable
            placeholder="add as many properties you want here"
            style={{ width: '100%' }}
            onChange={inputChange}
            menuStyle={{ width: 300, display: 'none' }}
          />
        )}
      </Body>
      <Footer>
        <Button
          onClick={addButtonClick}
          appearance="primary"
          color="cyan"
          disabled={!state.propName.length}
        >
          Ok
        </Button>
        <Button onClick={close} appearance="subtle">
          Cancel
        </Button>
      </Footer>
    </Modal>
  )
}

export default connect((state, ownProps) => {
  const { prop } = state
  return { ...ownProps, propNamesForThisModel: prop[ownProps.id] }
})(AddProp)
