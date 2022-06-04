import React from 'react'
import { SiGraphql } from 'react-icons/si'

import { IconButton } from 'rsuite'

type GenerateGraphQlSchemaProps = {
  disableModalControllers: boolean
  isTourOpen: boolean
}

const GenerateGraphQlSchema = ({
  disableModalControllers,
  isTourOpen,
}: GenerateGraphQlSchemaProps) => {
  return (
    <IconButton
      id={isTourOpen ? 'create-a-graphql-btn' : null}
      icon={
        <i className="rs-icon">
          <SiGraphql color="#dd34a6" />
        </i>
      }
      size="xs"
      disabled={disableModalControllers}
      style={{ marginLeft: '5px' }}
    >
      Generate GraphQL Schema
    </IconButton>
  )
}

export default GenerateGraphQlSchema
