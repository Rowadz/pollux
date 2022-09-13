import React from 'react'

import styled from 'styled-components'
import { MODEL_NODE } from './nodesTypes'

const Card = styled.div`
  margin: 30px auto;
  height: 100px;
  border-radius: 40px;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
  cursor: grab;
  display: flex;
  font-size: 40px;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  :hover {
    transform: scale(0.9, 0.9);
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
      -5px -5px 30px 15px skyblue;
  }
`

export const NodesDragDrop = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: 'input' | 'default' | 'output' | typeof MODEL_NODE
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <>
      <Card
        className="dndnode input"
        onDragStart={(event) => {
          const img = document.createElement('img')
          img.src = 'http://kryogenix.org/images/hackergotchi-simpler.png'
          event.dataTransfer.setDragImage(img, 0, 0)
          onDragStart(event, MODEL_NODE)
        }}
        draggable
      >
        <div>Model Node</div>
      </Card>
    </>
  )
}
