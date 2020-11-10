import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Icon,
  IconButton,
  Panel,
  PanelGroup,
  Grid,
  Row,
  Col,
  Whisper,
  Tooltip,
  Tag,
  InputNumber,
  Alert,
} from 'rsuite'
import ConfirmDel from './ConfirmDel'
import PropsDisplay from './PropsDisplay'
import AddProp from './AddProp'
import CreateRel from './CreateRel'
import * as faker from 'faker'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import npmCongif from '../../../../../../zipFileContent/package.json'
import apiReadme from '../../../../../../zipFileContent/readme.md'

import {
  deleteModel,
  addPropName,
  removeAllProps,
  updateAmount,
} from 'redux/actions'

const toJSONPritty = (data) => JSON.stringify(data, null, 2)

const Model = ({
  dispatch,
  model: { id, name, amount },
  propsCount,
  props,
  relations,
  relationsProps,
  isTourOpen,
}) => {
  const [state, setState] = useState({
    showConfirmModal: false,
    showPropNameModal: false,
    showCreateRel: false,
    amount: 10,
  })
  const delToolTip = (
    <Tooltip>
      Click here to <b>Delete</b> this model {'`'}
      {name}
      {'`'}.
    </Tooltip>
  )
  const addKeyTip = <Tooltip>Click here to add an attribute.</Tooltip>
  const generateTip = (
    <Tooltip>
      Click here to <b>generate</b> a json for this model.
    </Tooltip>
  )
  const closeConfirmModal = () =>
    setState({
      ...state,
      showConfirmModal: false,
      showPropNameModal: false,
      showCreateRel: false,
    })
  const openConfirmModal = () =>
    setState({ ...state, showConfirmModal: true, showCreateRel: false })
  const openPropNameModal = () =>
    setState({
      ...state,
      showConfirmModal: false,
      showCreateRel: false,
      showPropNameModal: true,
    })

  const openCreateRelModal = () =>
    setState({
      ...state,
      showConfirmModal: false,
      showPropNameModal: false,
      showCreateRel: true,
    })

  const del = (id) => {
    closeConfirmModal()
    dispatch(removeAllProps(id))
    dispatch(deleteModel(id))
  }

  const changeAmount = (val) => {
    setState({ ...state, amount: +val })
    dispatch(updateAmount({ modelId: id, amount: +val }))
  }

  const generate = (justReturn) => {
    if (!props) {
      Alert.warning(`plz add some properties to this model (${name})`)
      return
    }
    const atLeastOneWithoutFunc = props
      .filter(({ func }) => !func)
      .map(({ propName }) => propName)
    const len = atLeastOneWithoutFunc.length
    if (len > 0) {
      Alert.warning(
        `There is ${len} ${
          len === 1 ? 'property' : 'properties'
        } without function ${atLeastOneWithoutFunc.join(' || ')}`
      )
      return
    }
    const res = generateFakeData(props, amount)
    if (relations) {
      const relData = relations.reduce(
        (prevObj, { id, name, amount }) => ({
          ...prevObj,
          [name]: generateFakeData(relationsProps[id], amount),
        }),
        {}
      )
      const resWithRelations = res.map((obj) => ({ ...obj, ...relData }))
      // const resWithRelations = res.map((obj) => ({
      //   ...obj,
      //   ...relations.reduce(
      //     (prev, { name, id }) => ({
      //       ...prev,
      //       [name]: generateFakeData(relationsProps[id]),
      //     }),
      //     {}
      //   ),
      // }))
      if (justReturn) {
        return resWithRelations
      }
      downloadData(resWithRelations)
    } else {
      if (justReturn) {
        return res
      }
      downloadData(res)
    }
  }

  const downloadData = (data) => {
    saveAs(new Blob([toJSONPritty(data)], { type: 'application/json' }), name)
  }

  const generateFakeData = (props, amount) =>
    Array.from({ length: amount }).map(() => {
      return props.reduce(
        (prev, { propName, groupName, func }) => ({
          ...prev,
          [propName]: faker[groupName][
            func === 'fullName' ? 'findName' : func
          ](),
        }),
        {}
      )
    })

  const addProp = (name) => dispatch(addPropName({ propName: name, uuid: id }))
  const generateAPI = async () => {
    try {
      const zip = new JSZip()
      zip.file('package.json', toJSONPritty(npmCongif))
      zip.file('db.json', toJSONPritty({ [name]: generate(true) }))
      zip.file('README.md', apiReadme(name))
      const zipContent = await zip.generateAsync({ type: 'blob' })
      saveAs(zipContent, 'pollux-api.zip')
    } catch (error) {
      Alert.error('Something went wrong while generating your API, please checkout the console')
      console.group('Error generating the API')
      console.log('the error object')
      console.error(error)
      console.log('you can open an issue with this error in the link below')
      console.log('https://github.com/MohammedAl-Rowad/pollux')
      console.groupEnd()
    }
  }

  const dynamicHeder = (
    <div>
      Model name {name}
      {
        <Tag
          color="cyan"
          style={{ marginLeft: '5px' }}
          id={isTourOpen ? 'prop-tag-count' : null}
        >
          {propsCount}
        </Tag>
      }
      <Whisper
        placement="right"
        trigger="hover"
        speaker={
          <Tooltip>
            Click here to create a relationship with other models
          </Tooltip>
        }
      >
        <IconButton
          id={isTourOpen ? 'create-a-relationship-btn' : null}
          icon={<Icon icon="link" />}
          style={{ marginLeft: '5px' }}
          color="violet"
          onClick={openCreateRelModal}
          circle
        />
      </Whisper>
      <Whisper
        placement="right"
        trigger="hover"
        speaker={
          <Tooltip>
            Click here to generate a json-server API from this model
          </Tooltip>
        }
      >
        <IconButton
          id={isTourOpen ? 'create-a-api-btn' : null}
          icon={<Icon icon="related-map" />}
          style={{ marginLeft: '5px' }}
          color="blue"
          circle
          onClick={generateAPI}
        />
      </Whisper>
    </div>
  )
  return (
    <section>
      <PanelGroup bordered>
        <Panel shaded header={dynamicHeder}>
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={24}>
                <Whisper placement="right" trigger="hover" speaker={addKeyTip}>
                  <IconButton
                    icon={<Icon icon="plus" />}
                    id={isTourOpen ? 'add-attribute-btn' : null}
                    color="cyan"
                    circle
                    onClick={openPropNameModal}
                  />
                </Whisper>
                <Whisper
                  placement="right"
                  trigger="hover"
                  speaker={generateTip}
                >
                  <IconButton
                    id={isTourOpen ? 'generate-data-btn' : null}
                    style={{ marginLeft: '5px' }}
                    icon={<Icon icon="magic2" />}
                    color="orange"
                    circle
                    onClick={() => generate()}
                  />
                </Whisper>
                <div
                  style={{
                    width: 100,
                    display: 'inline',
                    position: 'absolute',
                    paddingLeft: 10,
                  }}
                >
                  <InputNumber
                    defaultValue={amount}
                    max={500}
                    min={1}
                    onChange={changeAmount}
                  />
                </div>
                <Whisper placement="left" trigger="hover" speaker={delToolTip}>
                  <IconButton
                    icon={<Icon icon="minus" />}
                    style={{ float: 'right' }}
                    color="red"
                    circle
                    onClick={openConfirmModal}
                  />
                </Whisper>
                <ConfirmDel
                  id={id}
                  del={del}
                  closeConfirmModal={closeConfirmModal}
                  name={name}
                  showConfirmModal={state.showConfirmModal}
                />
                <AddProp
                  id={id}
                  showPropNameModal={state.showPropNameModal}
                  closeConfirmModal={closeConfirmModal}
                  name={name}
                  addProp={addProp}
                />
                {isTourOpen ? (
                  ''
                ) : (
                  <CreateRel
                    showCreateRel={state.showCreateRel}
                    id={id}
                    close={closeConfirmModal}
                  />
                )}
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                style={{ textAlign: 'right', marginTop: '10px' }}
              >
                <PropsDisplay id={id} modelName={name} />
              </Col>
            </Row>
          </Grid>
        </Panel>
      </PanelGroup>
    </section>
  )
}

export default connect((state, ownProps) => ({
  ...ownProps,
  propsCount: (state.prop[ownProps.model.id] || []).length,
  props: state.prop[ownProps.model.id],
  relations: (state.relations[ownProps.model.id] || []).map((uuid) =>
    state.models.find(({ id }) => uuid === id)
  ),
  relationsProps: (state.relations[ownProps.model.id] || []).reduce(
    (prev, id) => ({ ...prev, [id]: state.prop[id] }),
    {}
  ),
}))(Model)
