import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal } from 'rsuite'
const { Body, Footer, Header, Title } = Modal

const CreateRel = ({ showCreateRel, mainModel, close, eligibleModels }) => {
  console.log({ eligibleModels, mainModel })
  return (
    <Modal
      backdrop="static"
      onHide={close}
      show={showCreateRel}
      style={{ maxWidth: '100%' }}
      size="lg"
    >
      <Header>
        <Title>
          Create Relation for{' '}
          <span style={{ color: '#1b9cb0' }}>
            {mainModel.name.toUpperCase()}
          </span>{' '}
          model
        </Title>
      </Header>
      <Body>
        <h4>Eligible Models:</h4>
      </Body>
      <Footer>
        <Button appearance="primary" color="cyan">
          Ok
        </Button>
        <Button appearance="subtle" onClick={close}>
          Cancel
        </Button>
      </Footer>
    </Modal>
  )
}

export default connect((state, ownProps) => {
  const { models } = state

  return {
    ...ownProps,
    eligibleModels: (models || []).filter(({ id }) => id !== ownProps.id),
    mainModel: (models || []).filter(({ id }) => id === ownProps.id)[0],
  }
})(CreateRel)
