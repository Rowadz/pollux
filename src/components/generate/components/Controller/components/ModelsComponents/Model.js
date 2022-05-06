import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  SiJavascript,
  SiPython,
  SiPhp,
  SiRuby,
  SiGraphql,
} from 'react-icons/si'
import { DiMysql } from 'react-icons/di'
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
  FlexboxGrid,
  Tag,
  Badge,
  InputNumber,
  Alert,
  ButtonGroup,
  Button,
  Dropdown,
} from 'rsuite'
import ConfirmDel from './ConfirmDel'
import PropsDisplay from './PropsDisplay'
import AddProp from './AddProp'
import CreateRel from './CreateRel'
import { v4 } from 'uuid'
import {
  generate,
  relationsPropsGetter,
  relationsGetter,
  generateAPI,
  generateGraphqlAPI,
} from '../../util'

import {
  deleteModel,
  addPropName,
  removeAllProps,
  updateAmount,
  justAddProp,
} from 'redux/actions'
import { useDrop } from 'react-dnd'
import CodeGenerator from './CodeGenerator'
import RenderLangIcon from './RenderLangIcon'
import WebWorkerProgress from './WebWorkerProgress'
import { eventEmitter } from 'components/generate/webWorker/eventEmitter'

const Model = ({
  dispatch,
  model: { id, name, amount },
  propsCount,
  props,
  relations,
  relationsProps,
  isTourOpen,
  faker,
  auth,
  checkedModels,
}) => {
  const [state, setState] = useState({
    showConfirmModal: false,
    showPropNameModal: false,
    showCreateRel: false,
    amount: 10,
  })

  const [lang, setLang] = useState('ruby')
  const [showModal, setShowModal] = useState(false)
  const [disableModalControllers, setDisableModalControllers] = useState(false)

  const [{ canDrop, hovered }, drop] = useDrop({
    accept: [
      'UUID',
      'Email',
      'Password',
      'Full Name',
      'Paragraphs',
      'REGEX',
      'Paragraph',
      'IP',
      'Image',
      ...faker.map(({ groupName }) => groupName),
    ], // TODO:: why hardcoded
    canDrop() {
      return true
    },
    collect(monitor) {
      return {
        canDrop: monitor && monitor.canDrop(),
        hovered: monitor && monitor.isOver(),
      }
    },
    drop({ data }) {
      dispatch(justAddProp({ uuid: id, props: [{ ...data, id: v4() }] }))
      Alert.success(`Added the ${data.propName} props`)
    },
  })

  useEffect(() => {
    eventEmitter.on('STARTED', () => {
      setDisableModalControllers(true)
    })
    eventEmitter.on(
      'STOPPED',
      (() => {
        const maxWorkers = navigator.hardwareConcurrency || 4
        let counter = 0
        return () => {
          counter++
          // means that all the workers are done
          if (counter === maxWorkers) {
            setDisableModalControllers(false)
            counter = 0
          }
        }
      })()
    )
  }, [])

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

  const addProp = (name) => dispatch(addPropName({ propName: name, uuid: id }))

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
        {checkedModels.size ? (
          <Badge content={checkedModels.size}>
            <IconButton
              disabled={disableModalControllers}
              id={isTourOpen ? 'create-a-relationship-btn' : null}
              icon={<Icon icon="link" />}
              style={{ marginLeft: '5px' }}
              size="xs"
              onClick={openCreateRelModal}
            >
              Create 1:m relations
            </IconButton>
          </Badge>
        ) : (
          <IconButton
            id={isTourOpen ? 'create-a-relationship-btn' : null}
            icon={<Icon icon="link" />}
            style={{ marginLeft: '5px' }}
            size="xs"
            disabled={disableModalControllers}
            onClick={openCreateRelModal}
          >
            Create 1:m relations
          </IconButton>
        )}
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
          icon={<Icon icon="twinkle-star" />}
          size="xs"
          disabled={disableModalControllers}
          style={{ marginLeft: '5px' }}
          onClick={() =>
            generateAPI(
              name,
              props,
              amount,
              relations,
              relationsProps,
              null,
              auth,
              id
            )
          }
        >
          Generate Restful API
        </IconButton>
      </Whisper>
      <Whisper
        placement="right"
        trigger="hover"
        speaker={
          <Tooltip>
            Click here to generate a GraphQL API from this model
          </Tooltip>
        }
      >
        <IconButton
          id={isTourOpen ? 'create-a-graphql-btn' : null}
          icon={
            <i className="rs-icon">
              <SiGraphql color="#dd34a6" />
            </i>
          }
          size="xs"
          disabled={disableModalControllers}
          style={{ marginLeft: '5px' }}
          onClick={() =>
            generateGraphqlAPI(
              name,
              props,
              amount,
              relations,
              relationsProps,
              id
            )
          }
        >
          Generate GraphQL API
        </IconButton>
      </Whisper>
      <div ref={drop}>
        <Panel
          shaded
          style={{
            backgroundColor: hovered ? '#8BCAD9' : canDrop ? '#5E6D8C' : '',
            height: 50,
            marginTop: 10,
            // color: hovered ? '#000' : '#fff',
          }}
        >
          <Badge style={{ background: '#1b9cb0' }} /> Drop Props Here{' '}
          <Badge style={{ background: '#1b9cb0' }} />
        </Panel>
      </div>
    </div>
  )
  return (
    <section style={{ marginTop: 20 }}>
      <PanelGroup bordered>
        <Panel shaded header={dynamicHeder}>
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={24}>
                <FlexboxGrid justify="start">
                  <FlexboxGrid.Item>
                    <Whisper
                      placement="right"
                      trigger="hover"
                      speaker={addKeyTip}
                    >
                      <IconButton
                        disabled={disableModalControllers}
                        icon={<Icon icon="plus" />}
                        size="xs"
                        id={isTourOpen ? 'add-attribute-btn' : null}
                        onClick={openPropNameModal}
                      >
                        Add attribute
                      </IconButton>
                    </Whisper>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item>
                    <Whisper
                      placement="right"
                      trigger="hover"
                      speaker={generateTip}
                    >
                      <IconButton
                        id={isTourOpen ? 'generate-data-btn' : null}
                        style={{ marginLeft: '5px' }}
                        size="xs"
                        disabled={disableModalControllers}
                        icon={<Icon icon="magic2" />}
                        onClick={() =>
                          generate(
                            props,
                            name,
                            amount,
                            relations,
                            relationsProps,
                            false,
                            id,
                            true
                          )
                        }
                      >
                        Generate JSON
                      </IconButton>
                    </Whisper>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item>
                    <Whisper
                      placement="right"
                      trigger="hover"
                      speaker={
                        <Tooltip>
                          Click here to generate a <b>{lang}</b> code for this
                          model for .
                        </Tooltip>
                      }
                    >
                      <ButtonGroup style={{ marginLeft: '5px' }}>
                        <Button
                          disabled={disableModalControllers}
                          onClick={() => setShowModal(true)}
                          size="xs"
                        >
                          <RenderLangIcon lang={lang} />
                        </Button>
                        <Dropdown
                          disabled={disableModalControllers}
                          placement="bottomEnd"
                          onSelect={(selectedLang) => {
                            setLang(selectedLang)
                          }}
                          renderTitle={() => {
                            return (
                              <IconButton
                                size="xs"
                                icon={<Icon icon="angle-double-down" />}
                              />
                            )
                          }}
                        >
                          <Dropdown.Item
                            eventKey="php"
                            icon={<SiPhp size="1rem" color="#474A8A" />}
                          />
                          <Dropdown.Item
                            eventKey="python"
                            icon={<SiPython size="1rem" color="#34709f" />}
                          />
                          <Dropdown.Item
                            eventKey="javascript"
                            icon={<SiJavascript size="1rem" color="#e8d44d" />}
                          />
                          <Dropdown.Item
                            eventKey="ruby"
                            icon={<SiRuby size="1rem" color="#e51521" />}
                          />
                          <Dropdown.Item
                            eventKey="sql"
                            icon={<DiMysql size="1rem" color="#F2913D" />}
                          />
                        </Dropdown>
                      </ButtonGroup>
                    </Whisper>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item style={{ marginLeft: '5px' }}>
                    <InputNumber
                      size="xs"
                      disabled={disableModalControllers}
                      defaultValue={amount}
                      max={1000000}
                      min={1}
                      onChange={changeAmount}
                    />
                  </FlexboxGrid.Item>
                </FlexboxGrid>

                <WebWorkerProgress
                  modelId={id}
                  relations={relations}
                  relationsProps={relationsProps}
                />

                <Whisper placement="left" trigger="hover" speaker={delToolTip}>
                  <IconButton
                    icon={<Icon icon="minus" />}
                    style={{ float: 'right' }}
                    color="red"
                    disabled={disableModalControllers}
                    size="xs"
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
                <PropsDisplay
                  id={id}
                  modelName={name}
                  disableModalControllers={disableModalControllers}
                />
              </Col>
            </Row>
          </Grid>
        </Panel>
      </PanelGroup>
      {showModal && (
        <CodeGenerator
          setShowModal={setShowModal}
          lang={lang}
          name={name}
          amount={amount}
          id={id}
          props={props}
          relations={relations}
          relationsProps={relationsProps}
          key={`${showModal}-${lang}`}
        />
      )}
    </section>
  )
}

export default connect((state, ownProps) => ({
  ...ownProps,
  propsCount: (state.prop[ownProps.model.id] || []).length,
  props: state.prop[ownProps.model.id],
  relations: relationsGetter(state, ownProps.model.id),
  relationsProps: relationsPropsGetter(state, ownProps.model.id),
  faker: state.faker,
  auth: state.auth,
  checkedModels: new Set(state.relations[ownProps.model.id] || []),
}))(Model)
