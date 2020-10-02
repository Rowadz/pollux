import React from 'react'
import { connect } from 'react-redux'
import { Button, Modal } from 'rsuite'
const { Body, Footer, Header, Title } = Modal

const CreateRel = ({ showCreateRel, id, close }) => {
  console.log(id)
  return (
    <Modal
      backdrop="static"
      onHide={close}
      show={showCreateRel}
      style={{ maxWidth: '100%' }}
      size="lg"
    >
      <Header>
        <Title>Create Rel</Title>
      </Header>
      <Body></Body>
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
  console.log(state)
  return { ...ownProps }
})(CreateRel)
