import React, { useState } from 'react'
import { InputPicker, List, FlexboxGrid, Icon, IconButton } from 'rsuite'
import AddProp from './AddProp'
import { connect } from 'react-redux'
import { delProp, editProp } from 'redux/actions'

const Prop = ({
  i,
  name,
  id,
  modelName,
  modelId,
  dispatch,
  inputData,
  func,
}) => {
  const [state, setState] = useState({ showPropNameModal: false, func })
  const closeModal = () => setState({ ...state, showPropNameModal: false })
  const openModal = () => setState({ ...state, showPropNameModal: true })
  const del = () => dispatch(delProp({ propId: id, modelId }))
  const onFuncSelect = (value) => {
    setState({ ...state, func: value })
    dispatch(editProp({ id: modelId, propId: id, func: value }))
  }

  return (
    <List.Item key={i} index={i}>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={6} style={{ textAlign: 'left' }}>
          <h4>
            <Icon icon="circle" /> {name}
          </h4>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12} style={{ textAlign: 'left' }}>
          <InputPicker
            onChange={onFuncSelect}
            data={inputData}
            defaultValue={state.func}
            groupBy="groupName"
            placeholder="Select a function"
            style={{ width: '100%' }}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={0}>
          <AddProp
            id={modelId}
            showPropNameModal={state.showPropNameModal}
            closeConfirmModal={closeModal}
            propNameProp={name}
            name={modelName}
            propId={id}
            mode={'edit'}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <IconButton
            style={{ margin: '5px' }}
            icon={<Icon icon="edit" />}
            color="cyan"
            circle
            onClick={openModal}
          />
          <IconButton
            style={{ margin: '5px' }}
            icon={<Icon icon="minus" />}
            color="red"
            circle
            onClick={del}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  )
}

export default connect((state, ownProp) => ({
  ...ownProp,
  inputData: state.faker,
}))(Prop)
