import React from 'react'
import { Panel } from 'rsuite'
import styled from 'styled-components'

const CustomPanel = styled(Panel)`
  border: 1px solid #000;
`

export const NodesDragDrop = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: 'input' | 'default' | 'output'
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>

      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, 'input')}
        draggable
      >
        <CustomPanel header="Input Node" />
      </div>
    </aside>
  )
}
