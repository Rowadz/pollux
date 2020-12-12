import React from 'react'
import { useDrag } from 'react-dnd'
import { List, Icon } from 'rsuite'
import styles from './DraggableCommonProp.module.css'
import { map } from 'components/Builder/maps'

const DraggableCommonProp = ({ type, icon }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: { type, data: map.get(type) },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div ref={dragRef}>
      <List.Item
        className={styles.item}
        style={{
          cursor: isDragging && 'grabbing',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Icon icon={icon} /> {type}
      </List.Item>
    </div>
  )
}

export default DraggableCommonProp
