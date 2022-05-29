import React, { memo } from 'react'
import { Handle, Position } from 'react-flow-renderer'
import type { NodeProps } from 'react-flow-renderer'
import styled from 'styled-components'

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
  return (
    <>
      <Handle
        type="source"
        id="aa"
        position={Position.Left}
        style={{ background: 'red' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <ModelNodeBody>
        Users
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
        id="a"
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  )
})
