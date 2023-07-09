import React from 'react'
import { useDrag } from 'react-dnd'
import { List, Icon } from 'rsuite'
import styles from './DraggableCommonProp.module.css'
import { map } from 'components/Builder/maps.js'

const DraggableCommonProp = ({ type, icon, label, func, children }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type,
    item: {
      type,
      data: map.get(type) || { propName: label, groupName: type, func },
    },
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
        <Icon icon={icon || 'circle-o'} /> {label || type}
        {children}
      </List.Item>
    </div>
  )
}

export default DraggableCommonProp
