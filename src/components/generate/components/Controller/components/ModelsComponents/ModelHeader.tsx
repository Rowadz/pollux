import React, { memo } from 'react'
import { useDrop } from 'react-dnd'
import { v4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { justAddProp, toggleBuilderAction } from 'redux/actions'
import { SiGraphql } from 'react-icons/si'
import {
  Tag,
  Whisper,
  Tooltip,
  Badge,
  IconButton,
  Panel,
  Icon,
  Alert,
  Button,
} from 'rsuite'
import type { ModelHeaderProps } from './types'
import type { FakerPolluxReduxStoreState, ReduxState } from 'components/shared'

export const ModelHeader = ({
  id,
  name,
  faker,
  isTourOpen,
  propsCount,
  generateGraphQl,
  generate,
  checkedModels,
  openCreateRelModal,
  disableModalControllers,
}: ModelHeaderProps) => {
  const dispatch = useDispatch()
  const isOpen: boolean = useSelector((state: ReduxState) => state.builder)

  const toggle = () => {
    dispatch(toggleBuilderAction(!isOpen))
  }

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
      ...faker.map(({ groupName }: FakerPolluxReduxStoreState) => groupName),
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
    drop({ data }: any) {
      dispatch(justAddProp({ uuid: id, props: [{ ...data, id: v4() }] } as any))
      Alert.success(`Added the ${data.propName} props`)
    },
  })

  return (
    <>
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
          onClick={generate}
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
          onClick={generateGraphQl}
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
            color: hovered ? '#000' : '#fff',
          }}
        >
          <Badge style={{ background: '#1b9cb0' }} />
          Drop Properties Here <Badge style={{ background: '#1b9cb0' }} />
          <Button
            size="xs"
            appearance="ghost"
            onClick={toggle}
            style={{ marginLeft: '1rem' }}
          >
            Open the Properties picker (the builder)
          </Button>
        </Panel>
      </div>
    </>
  )
}

export default memo(ModelHeader)
