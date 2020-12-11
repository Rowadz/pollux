import React from 'react'
import { List } from 'rsuite'
import DraggableCommonProp from './components/DraggableCommonProp'

const CommonProps = () => {
  return (
    <>
      <h4>Common Items</h4>
      <List>
        <DraggableCommonProp type="UUID" icon="id-mapping" />
        <DraggableCommonProp type="Email" icon="envelope" />
        <DraggableCommonProp type="Password" icon="eye-slash" />
        <DraggableCommonProp type="Full Name" icon="user" />
        <DraggableCommonProp type="Paragraphs" icon="file-text" />
        <DraggableCommonProp type="Paragraph" icon="file-text-o" />
        <DraggableCommonProp type="IP" icon="circle-o" />
        <DraggableCommonProp type="Image" icon="image" />
      </List>
    </>
  )
}

export default CommonProps
