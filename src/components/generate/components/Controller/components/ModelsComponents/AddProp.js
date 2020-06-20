import React, { useState } from 'react'
import { Input, Button, Modal, Message } from 'rsuite'
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
  const inputChange = (str) => setState({ ...state, propName: str.trim('') })
  const addButtonClick = () => {
    console.log(propNamesForThisModel)
    if (propNamesForThisModel) {
      // TODO: tell the user to stfu if the same prop exists
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
      addProp(state.propName)
      setState({ ...state, propName: '' })
    }
    closeConfirmModal()
  }
  return (
    <Modal
      backdrop="static"
      show={showPropNameModal}
      onHide={closeConfirmModal}
      style={{ maxWidth: '100%' }}
      size="lg"
    >
      <Header>
        <Title>
          {mode === 'edit'
            ? `Edit ${propNameProp} property`
            : 'Please enter the property name, you can change that later'}
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

        <Input
          style={{ width: '100%' }}
          placeholder={mode === 'edit' ? 'Change prop name' : 'Enter prop name'}
          onChange={inputChange}
          // defaultValue={propNameProp}
          // value={state.propName}
        />
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
        <Button onClick={closeConfirmModal} appearance="subtle">
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
