import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import CommonProps from '../builderComponents/CommonProps/CommonProps'
import DraggableCommonProp from '../builderComponents/CommonProps/components/DraggableCommonProp'
import { Divider, List, Input } from 'rsuite'

const BuilderBody = ({ faker }) => {
  const fakerObj = useMemo(() => faker, [faker])
  const [keyword, setKeyword] = useState('')
  return (
    <>
      <CommonProps />
      <Divider />
      <h4>Other Items</h4>
      <Input
        style={{ marginBottom: 10 }}
        placeholder="search in faker functions!"
        value={keyword}
        onChange={setKeyword}
      />
      <List>
        {fakerObj
          .filter((obj) =>
            obj.label.toLowerCase().includes(keyword.toLowerCase())
          )
          .map(({ groupName, label, value: func }, index) =>
            label === 'Faker' ? (
              <></>
            ) : (
              <DraggableCommonProp
                key={index}
                type={groupName}
                label={label}
                func={func}
              />
            )
          )}
      </List>
    </>
  )
}

const mapStateToProps = (state) => {
  return { faker: state.faker }
}

export default connect(mapStateToProps)(BuilderBody)
