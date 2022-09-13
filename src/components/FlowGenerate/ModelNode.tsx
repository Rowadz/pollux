import React, { memo } from 'react'
import { Handle, Position } from 'react-flow-renderer'
import type { NodeProps } from 'react-flow-renderer'
import styled from 'styled-components'
import { Input, InputGroup } from 'rsuite'

const styles = {
  width: 300,
  marginBottom: 10,
}

const ModelNodeBody = styled.div`
  background: #fff;
  border: 1px solid #1a192b;
  border-radius: 3px;
  color: #222;
  font-size: 12px;
  padding: 10px;
  text-align: center;
  width: 20rem;
`

export const ModelNode = memo(({ data, isConnectable }: NodeProps) => {
  console.log({ data })

  return (
    <>
      <Handle
        type="target"
        id={`${data.id}_target`}
        position={Position.Left}
        style={{ background: 'red' }}
        isConnectable={isConnectable}
      />
      <ModelNodeBody>
        <InputGroup style={styles}>
          <Input plaplaceholder="Default Input" />
          <InputGroup.Addon>👈 Model name</InputGroup.Addon>
        </InputGroup>
        <ol style={{ textAlign: 'left' }}>
          <li>id: auto increment</li>
          <li>username: string(255)</li>
          <li>email: email</li>
          <li>password: password</li>
          <li>about: paragraph</li>
        </ol>
      </ModelNodeBody>
      <Handle
        type="source"
        position={Position.Right}
        id={`${data.id}_source`}
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  )
})
