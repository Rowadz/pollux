import React, { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  Node,
  XYPosition,
} from 'react-flow-renderer'
import type { NodeTypes } from 'react-flow-renderer'
import styled from 'styled-components'
import * as data from './data'
import { ModelNode } from './ModelNode'
import { NodesDragDrop } from './NodesDragDrop'

const ReactFlowSection = styled.section`
  height: 35rem;
  border: 1px solid #fff;
`

let id = 0
const getId = () => `dndnode_${id++}`

const nodeTypes: NodeTypes = {
  modelNode: ModelNode,
}

const FlowGenerate = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>()
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes)
  const [edges, , onEdgesChange] = useEdgesState(data.edges)

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - (reactFlowBounds?.left || 0),
        y: event.clientY - (reactFlowBounds?.top || 0),
      }) as XYPosition
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  return (
    <ReactFlowProvider>
      <ReactFlowSection className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          fitView
          snapToGrid
          nodes={nodes}
          edges={edges}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onInit={setReactFlowInstance}
          onEdgesChange={onEdgesChange}
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </ReactFlowSection>
      <NodesDragDrop />
    </ReactFlowProvider>
  )
}

export default FlowGenerate
