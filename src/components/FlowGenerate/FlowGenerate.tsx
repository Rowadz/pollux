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
  Edge,
  Connection,
  updateEdge,
  addEdge,
} from 'react-flow-renderer'
import type { NodeTypes } from 'react-flow-renderer'
import styled from 'styled-components'
import * as data from './data'
import { ModelNode } from './ModelNode'
import { NodesDragDrop } from './NodesDragDrop'
import { FlexboxGrid } from 'rsuite'
import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem'
import { MODEL_NODE } from './nodesTypes'

const ReactFlowSection = styled.section`
  height: 50rem;
  width: 100%;
  border: 1px solid #fff;
`

let id = 0
const getId = () => `dndnode_${id++}`

const nodeTypes: NodeTypes = {
  [MODEL_NODE]: ModelNode,
}

const FlowGenerate = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>()
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges)

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, label: 'Many to Many' }, eds)),
    [setEdges]
  )

  // gets called after end of edge gets dragged to another source or target
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge<any>, newConnection: Connection) => {
      console.log({ oldEdge, newConnection })
      setEdges((els) => updateEdge(oldEdge, newConnection, els))
    },
    [setEdges]
  )

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
      const id = getId()
      const newNode: Node = {
        id,
        type,
        position,
        data: { label: `${type} node`, id },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes]
  )

  return (
    <ReactFlowProvider>
      <FlexboxGrid>
        <FlexboxGridItem style={{ width: '20%' }}>
          <NodesDragDrop />
        </FlexboxGridItem>
        <FlexboxGridItem style={{ width: '80%' }}>
          <ReactFlowSection
            className="reactflow-wrapper"
            ref={reactFlowWrapper}
          >
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
              onEdgeUpdate={onEdgeUpdate}
              onConnect={onConnect}
            >
              <MiniMap />
              <Controls />
            </ReactFlow>
          </ReactFlowSection>
        </FlexboxGridItem>
      </FlexboxGrid>
    </ReactFlowProvider>
  )
}

export default FlowGenerate
