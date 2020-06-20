import React, { useState } from 'react'
import { List, FlexboxGrid, Icon, IconButton } from 'rsuite'
import AddProp from './AddProp'
import { connect } from 'react-redux'
import { delProp } from 'redux/actions'

const Prop = ({ i, name, id, modelName, modelId, dispatch }) => {
  const [state, setState] = useState({ showPropNameModal: false })
  const closeModal = () => setState({ ...state, showPropNameModal: false })
  const openModal = () => setState({ ...state, showPropNameModal: true })
  const del = () => dispatch(delProp({ propId: id, modelId }))
  return (
    <List.Item key={i} index={i}>
      <FlexboxGrid>
        {/*icon*/}
        <FlexboxGrid.Item colspan={6} style={{ textAlign: 'left' }}>
          <h4>
            <Icon icon="circle" /> {name}
          </h4>
        </FlexboxGrid.Item>
        {/*base info*/}
        <FlexboxGrid.Item
          colspan={6}
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            overflow: 'hidden',
          }}
        ></FlexboxGrid.Item>
        {/*peak data*/}
        <FlexboxGrid.Item colspan={6}>
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
        {/*uv data*/}
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

export default connect()(Prop)
