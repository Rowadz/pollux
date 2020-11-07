import React, { useState } from 'react'
import { InputPicker, List, Grid, Col, Row, Icon, IconButton } from 'rsuite'
import AddProp from './AddProp'
import { connect } from 'react-redux'
import { delProp, editProp } from 'redux/actions'

const checkIfMobile = () =>
  /Mobi/.test(navigator.userAgent) || /Mobi|Android/i.test(navigator.userAgent)

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
    const findRes = inputData.find(({ value: val }) => value === val)
    if (!findRes) return
    const { groupName } = findRes
    setState({ ...state, func: value })
    dispatch(editProp({ id: modelId, propId: id, func: value, groupName }))
  }

  return (
    <List.Item key={i} index={i}>
      <Grid fluid>
        <Row
          colSpan={6}
          style={{ textAlign: checkIfMobile() ? 'center' : 'left' }}
        >
          <Col xs={24} sm={24} md={8}>
            <h4>
              <Icon icon="circle" /> {name}{' '}
              {checkIfMobile() ? <Icon icon="circle" /> : ''}
            </h4>
          </Col>

          <Col xs={24} sm={24} md={10} style={{ textAlign: 'left' }}>
            <InputPicker
              onChange={onFuncSelect}
              data={inputData}
              defaultValue={state.func}
              groupBy="groupName"
              placeholder="Select a function"
              style={{ width: '100%' }}
            />
          </Col>
          <AddProp
            id={modelId}
            showPropNameModal={state.showPropNameModal}
            closeConfirmModal={closeModal}
            propNameProp={name}
            name={modelName}
            propId={id}
            mode={'edit'}
          />
          <Col
            xs={12}
            sm={12}
            md={3}
            style={{ textAlign: checkIfMobile() ? 'left' : 'right' }}
          >
            <IconButton
              style={{ margin: '5px' }}
              icon={<Icon icon="edit" />}
              color="cyan"
              circle
              onClick={openModal}
            />
          </Col>

          <Col xs={12} sm={12} md={1} style={{ textAlign: 'right' }}>
            <IconButton
              style={{ margin: '5px' }}
              icon={<Icon icon="minus" />}
              color="red"
              circle
              onClick={del}
            />
          </Col>
        </Row>
      </Grid>
    </List.Item>
  )
}

export default connect((state, ownProp) => ({
  ...ownProp,
  inputData: state.faker,
}))(Prop)
