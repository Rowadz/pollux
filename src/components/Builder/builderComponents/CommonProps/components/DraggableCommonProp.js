import React from 'react'
import { useDrag } from 'react-dnd'
import { List, Icon } from 'rsuite'
import styles from './DraggableCommonProp.module.css'

const DraggableCommonProp = ({ type, icon }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div ref={dragRef}>
      <List.Item
        className={styles.item}
        style={{ cursor: isDragging && 'grabbing' }}
      >
        <Icon icon={icon} /> {type}
      </List.Item>
    </div>
  )
}

export default DraggableCommonProp
