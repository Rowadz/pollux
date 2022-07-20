import React, { memo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { githubDark } from '@uiw/codemirror-theme-github'

import { Alert, Icon, IconButton, Modal } from 'rsuite'

const GraphQlModel = ({
  graphql,
  toggleShowModal,
}: {
  graphql: string
  toggleShowModal: () => any
}) => {
  return (
    <>
      <Modal size="lg" full show={true} onHide={toggleShowModal}>
        <Modal.Header>
          <Modal.Title>Copy this GraphQL code</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: 700, overflow: 'hidden' }}>
          <IconButton
            appearance="ghost"
            style={{ marginBottom: '5px' }}
            icon={<Icon icon="copy-o" />}
            onClick={() => {
              navigator.clipboard
                .writeText(graphql)
                .then(() => {
                  Alert.info('Copied!')
                })
                .catch((error) => {
                  console.error(error)
                  Alert.error('Error')
                })
            }}
          >
            Copy
          </IconButton>
          <CodeMirror theme={githubDark} value={graphql} height="300px" />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default memo(GraphQlModel)
