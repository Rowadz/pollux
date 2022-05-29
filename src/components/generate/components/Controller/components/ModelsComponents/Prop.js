import React, { useEffect, useState } from 'react'
import {
  InputPicker,
  List,
  Grid,
  Col,
  Row,
  Icon,
  IconButton,
  Input,
} from 'rsuite'
import AddProp from './AddProp'
import { connect } from 'react-redux'
import { delProp, editProp } from 'redux/actions'
import styled from 'styled-components'
import { danger, normal } from '../../../../../../colors'
import { useDebouncedCallback } from 'use-debounce'
import { Flipped, Flipper } from 'react-flip-toolkit'

const dangerClass = 'danger'

const Wrapper = styled.div`
  & .${dangerClass} {
    border-color: ${danger};
    color: ${danger};
  }
`
Wrapper.dangerClass = dangerClass

const checkIfMobile = () =>
  /Mobi/.test(navigator.userAgent) || /Mobi|Android/i.test(navigator.userAgent)

const Prop = ({
  i,
  name,
  id,
  regex,
  modelName,
  modelId,
  dispatch,
  inputData,
  func,
  disableModalControllers,
}) => {
  const [fullScreen, setFullScreen] = useState(false)
  const [state, setState] = useState({ showPropNameModal: false, func })
  const [regexError, setRegexErrors] = useState(false)
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

  useEffect(() => {
    setFullScreen((prevState) => !prevState)
  }, [])

  const debouncedOnRegexUpdate = useDebouncedCallback((value) => {
    try {
      new RegExp(value)
    } catch {
      setRegexErrors(true)
    } finally {
      setRegexErrors(value === '')
      dispatch(editProp({ id: modelId, regex: value, propId: id }))
    }
  }, 200)

  const icon =
    func !== 'regex' ? (
      <Icon icon="circle" />
    ) : (
      <Icon icon="creative" style={{ color: normal }} />
    )

  return (
    <Flipper flipKey={fullScreen}>
      <Flipped flipId="square-prop">
        <List.Item
          key={i}
          index={i}
          style={
            fullScreen
              ? { width: '100%', height: '100%' }
              : { width: 0, height: 0 }
          }
        >
          <Grid fluid>
            <Row
              colSpan={6}
              style={{ textAlign: checkIfMobile() ? 'center' : 'left' }}
            >
              <Col xs={24} sm={24} md={6}>
                <h6>
                  {icon} {name} {checkIfMobile() ? <Icon icon="circle" /> : ''}
                </h6>
              </Col>

              <Col xs={24} sm={24} md={12} style={{ textAlign: 'left' }}>
                {state.func === 'regex' ? (
                  <Wrapper>
                    <Input
                      size="sm"
                      disabled={disableModalControllers}
                      className={regexError ? Wrapper.dangerClass : ''}
                      placeholder="Type your regex here"
                      onChange={debouncedOnRegexUpdate}
                      defaultValue={regex}
                    />
                    {regexError ? (
                      <p className={Wrapper.dangerClass}>
                        The regex is not
                        <span role="img" aria-label="lemon">
                          🍋
                        </span>
                        JS
                        <span role="img" aria-label="lemon">
                          🍋
                        </span>
                        regex
                      </p>
                    ) : (
                      <p className={Wrapper.dangerClas}>
                        Write a
                        <span role="img" aria-label="lemon">
                          🍋
                        </span>
                        JS
                        <span role="img" aria-label="lemon">
                          🍋
                        </span>
                        regex here!
                      </p>
                    )}
                  </Wrapper>
                ) : (
                  <InputPicker
                    disabled={disableModalControllers}
                    size="sm"
                    onChange={onFuncSelect}
                    data={inputData}
                    defaultValue={state.func}
                    groupBy="groupName"
                    placeholder="Select a function"
                    style={{ width: '100%' }}
                  />
                )}
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
                  disabled={disableModalControllers}
                  style={{ margin: '5px' }}
                  size="xs"
                  icon={<Icon icon="edit" />}
                  circle
                  onClick={openModal}
                />
              </Col>

              <Col xs={12} sm={12} md={1} style={{ textAlign: 'right' }}>
                <IconButton
                  style={{ margin: '5px' }}
                  icon={<Icon icon="minus" />}
                  circle
                  disabled={disableModalControllers}
                  size="xs"
                  onClick={del}
                />
              </Col>
            </Row>
          </Grid>
        </List.Item>
      </Flipped>
    </Flipper>
  )
}

export default connect((state, ownProp) => ({
  ...ownProp,
  inputData: state.faker,
}))(Prop)
