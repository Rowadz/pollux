import React, { useState } from 'react'
import { IconButton, Icon, Modal, Button, Checkbox } from 'rsuite'
import { connect } from 'react-redux'

const { Header, Body, Footer, Title } = Modal

const SaveModel = ({ models, prop }) => {
  const [state, setState] = useState({ showModalSave: false, toSave: [] })
  const showModalSave = () => setState({ ...state, showModalSave: true })
  const close = () => setState({ ...state, showModalSave: false })
  const save = () => {
    const alreadySavedMayHaveDuplicate = JSON.parse(
      localStorage.getItem('models')
    )
    let alreadySaved = []
    let alreadySavedSet = new Set()
    if (alreadySavedMayHaveDuplicate) {
      const set = new Set(...state.toSave.map(({ id }) => id))
      alreadySaved = alreadySavedMayHaveDuplicate.filter(
        ({ id }) => !set.has(id)
      )
      alreadySavedSet = new Set(alreadySaved.map(({ id }) => id))
      localStorage.removeItem('models')
    }
    localStorage.setItem(
      'models',
      JSON.stringify([
        ...state.toSave.filter(({ id }) => !alreadySavedSet.has(id)),
        ...alreadySaved,
      ])
    )
    if (Object.keys(prop).length > 0) {
      const toSaveProps = state.toSave.map(({ id }) => prop[id])
      localStorage.setItem('props', JSON.stringify(toSaveProps))
    }
  }
  const toSave = (model, checked) => {
    if (checked) {
      setState({ ...state, toSave: [...state.toSave, model] })
    } else {
      setState({
        ...state,
        toSave: [...state.toSave.filter(({ id }) => id !== model.id)],
      })
    }
  }
  const modelsEl = models.length
    ? models.map(({ name, id }) => (
        <Checkbox name={name} onChange={toSave} key={id} value={{ name, id }}>
          {name}
        </Checkbox>
      ))
    : 'You need to create some models to save them'
  return (
    <section>
      <IconButton
        color="cyan"
        onClick={showModalSave}
        circle
        icon={<Icon icon="save" />}
      />
      <Modal
        show={state.showModalSave}
        onHide={close}
        style={{ maxWidth: '100%' }}
      >
        <Header>
          <Title>You can save a model here, then load it</Title>
        </Header>
        <Body>{modelsEl}</Body>
        <Footer>
          <Button
            onClick={save}
            appearance="primary"
            disabled={models.length === 0}
          >
            Save
          </Button>
          <Button onClick={close} appearance="subtle">
            Cancel
          </Button>
        </Footer>
      </Modal>
    </section>
  )
}

export default connect(({ models, prop }, ownProps) => ({
  ...ownProps,
  models,
  prop,
}))(SaveModel)
