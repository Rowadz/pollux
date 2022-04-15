import React, { useState } from 'react'
import { connect } from 'react-redux'
import { SiJavascript, SiPython, SiPhp, SiRuby } from 'react-icons/si'
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
}) => {
  const [state, setState] = useState({
    showConfirmModal: false,
    showPropNameModal: false,
    showCreateRel: false,
    amount: 10,
  })

  const [lang, setLang] = useState('ruby')
  const [showModal, setShowModal] = useState(false)

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
        <IconButton
          id={isTourOpen ? 'create-a-relationship-btn' : null}
          icon={<Icon icon="link" />}
          style={{ marginLeft: '5px' }}
          onClick={openCreateRelModal}
        >
          Create 1:m relations
        </IconButton>
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
          style={{ marginLeft: '5px' }}
          onClick={() =>
            generateAPI(
              name,
              props,
              amount,
              relations,
              relationsProps,
              null,
              auth
            )
          }
        >
          Generate Restful API
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
                <Whisper placement="right" trigger="hover" speaker={addKeyTip}>
                  <IconButton
                    icon={<Icon icon="plus" />}
                    id={isTourOpen ? 'add-attribute-btn' : null}
                    onClick={openPropNameModal}
                  >
                    Add attribute
                  </IconButton>
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
                    onClick={() =>
                      generate(props, name, amount, relations, relationsProps)
                    }
                  >
                    Generate JSON
                  </IconButton>
                </Whisper>
                <Whisper
                  placement="right"
                  trigger="hover"
                  speaker={
                    <Tooltip>
                      Click here to generate a <b>{lang}</b> code for this model
                      for .
                    </Tooltip>
                  }
                >
                  <ButtonGroup style={{ marginLeft: '5px' }}>
                    <Button onClick={() => setShowModal(true)}>
                      <RenderLangIcon lang={lang} />
                    </Button>
                    <Dropdown
                      placement="bottomEnd"
                      onSelect={(selectedLang) => {
                        setLang(selectedLang)
                      }}
                      renderTitle={() => {
                        return (
                          <IconButton
                            icon={<Icon icon="angle-double-down" />}
                          />
                        )
                      }}
                    >
                      <Dropdown.Item
                        eventKey="php"
                        icon={<SiPhp size="1.5rem" color="#474A8A" />}
                      />
                      <Dropdown.Item
                        eventKey="python"
                        icon={<SiPython size="1.5rem" color="#34709f" />}
                      />
                      <Dropdown.Item
                        eventKey="javascript"
                        icon={<SiJavascript size="1.5rem" color="#e8d44d" />}
                      />
                      <Dropdown.Item
                        eventKey="ruby"
                        icon={<SiRuby size="1.5rem" color="#e51521" />}
                      />
                      <Dropdown.Item
                        eventKey="sql"
                        icon={<DiMysql size="1.5rem" color="#F2913D" />}
                      />
                    </Dropdown>
                  </ButtonGroup>
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
                    max={100000}
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
      {showModal && (
        <CodeGenerator
          setShowModal={setShowModal}
          lang={lang}
          name={name}
          amount={amount}
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
}))(Model)
