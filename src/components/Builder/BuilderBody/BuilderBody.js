import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import CommonProps from '../builderComponents/CommonProps/CommonProps'
import DraggableCommonProp from '../builderComponents/CommonProps/components/DraggableCommonProp'
import { Divider, List } from 'rsuite'

const BuilderBody = ({ faker }) => {
  const fakerObj = useMemo(() => faker, [faker])
  return (
    <>
      <CommonProps />
      <Divider />
      <h4>Other Items</h4>
      <List>
        {fakerObj.map(({ groupName, label, value: func }) => (
          <DraggableCommonProp type={groupName} label={label} func={func} />
        ))}
      </List>
    </>
  )
}

const mapStateToProps = (state) => {
  return { faker: state.faker }
}

export default connect(mapStateToProps)(BuilderBody)
