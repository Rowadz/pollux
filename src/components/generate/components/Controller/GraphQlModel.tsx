import React, { memo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { FaCopy } from 'react-icons/fa'

import { IconButton, Modal, useToaster, Notification } from 'rsuite'

const GraphQlModel = ({
  graphql,
  toggleShowModal,
}: {
  graphql: string
  toggleShowModal: () => any
}) => {
  const toaster = useToaster()
  return (
    <>
      <Modal size="lg" full open={true} onClose={toggleShowModal}>
        <Modal.Header>
          <Modal.Title>Copy this GraphQL code</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: 700, overflow: 'hidden' }}>
          <IconButton
            appearance="ghost"
            style={{ marginBottom: '5px' }}
            icon={<FaCopy />}
            onClick={() => {
              navigator.clipboard
                .writeText(graphql)
                .then(() => {
                  toaster.push(
                    <Notification type="info" header="info" closable>
                      Copied!
                    </Notification>
                  )
                })
                .catch((error) => {
                  console.error(error)
                  toaster.push(
                    <Notification type="error" header="error" closable>
                      Copied!
                    </Notification>
                  )
                })
            }}
          >
            Copy
          </IconButton>
          <CodeMirror theme={oneDark} value={graphql} height="300px" />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default memo(GraphQlModel)
