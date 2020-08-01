import React, { useState } from 'react'
import { IconButton, Icon, Modal, Button, Checkbox } from 'rsuite'
import { connect } from 'react-redux'
import emptySave from './emptySave.svg'
import { Alert } from 'rsuite'
const { Header, Body, Footer, Title } = Modal

const SaveModel = ({ models, prop }) => {
  const [state, setState] = useState({ showModalSave: false, toSave: [] })
  const showModalSave = () =>
    setState({ ...state, toSave: [], showModalSave: true })
  const close = () => setState({ ...state, showModalSave: false })
  const save = () => {
    const toSave = models.map(({ id, ...rest }) => ({
      props: prop[id],
      id,
      ...rest,
    }))
    localStorage.setItem('models', JSON.stringify(toSave))
    Alert.success(
      `Saved models [ ${toSave.map(({ name }) => name).join(' || ')} ]`
    )
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
  const modelsEl = models.length ? (
    models.map(({ name, id }) => (
      <Checkbox name={name} onChange={toSave} key={id} value={{ name, id }}>
        {name}
      </Checkbox>
    ))
  ) : (
    <div style={{ textAlign: 'center' }}>
      <img src={emptySave} height="100" width={'100%'} alt="no models img" />
      <p>You need to create some models to save them </p>
    </div>
  )
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
