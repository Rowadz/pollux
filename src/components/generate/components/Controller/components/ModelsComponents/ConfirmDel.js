import React from 'react'
import { Icon, Button, Modal } from 'rsuite'
import { danger } from 'colors'
const { Body, Footer, Header, Title } = Modal

const ConfirmDel = ({ showConfirmModal, closeConfirmModal, name, del, id }) => {
  return (
    <Modal
      backdrop="static"
      onHide={closeConfirmModal}
      size="xs"
      show={showConfirmModal}
      style={{ maxWidth: '100%' }}
    >
      <Header>
        <Title>Confirm</Title>
      </Header>
      <Body>
        <Icon
          icon="remind"
          style={{
            color: '#ffb300',
            fontSize: 24,
          }}
        />
        <b>
          {' '}
          Are you sure you want to delete this model {'`'}
          <span style={{ color: danger }}>{name}</span>
          {'`'}?
        </b>
      </Body>
      <Footer>
        <Button onClick={() => del(id)} appearance="primary" color="red">
          Ok
        </Button>
        <Button onClick={closeConfirmModal} appearance="subtle">
          Cancel
        </Button>
      </Footer>
    </Modal>
  )
}

export default ConfirmDel
