import React, { memo, useState } from 'react'
import {
  FakerProp,
  ReduxState,
  selectProps,
  toGraphQl,
} from 'components/shared'
import { SiGraphql } from 'react-icons/si'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useToggle } from 'react-use'
import { addPropName } from 'redux/actions'
import { FlexboxGrid, Icon, IconButton, InputNumber } from 'rsuite'
import styled from 'styled-components'

import AddProp from './AddProp'
import LanguageSelector from './LanguageSelector'
import GraphQlModel from '../../GraphQlModel'
import { generate } from '../../util'

const SiGraphqlContainer = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;
`

type ModelSubHeaderProps = {
  disableModalControllers: boolean
  isTourOpen: boolean
  modelName: string
  modelId: string
  amount: number
  changeAmount: (val: string | number) => void
  generate: (justReturn?: boolean) => ReturnType<typeof generate>
}

const ModelSubHeader = ({
  amount,
  modelName,
  modelId,
  generate,
  isTourOpen,
  changeAmount,
  disableModalControllers,
}: ModelSubHeaderProps) => {
  const [showModal, toggleShowModal] = useToggle(false)
  const [graphql, setGraphQl] = useState<string>('')
  const [showPropNameModal, toggleShowPropNameModal] = useToggle(false)
  const dispatch = useDispatch()

  const modelProps: FakerProp[] = useSelector(
    (state: ReduxState) => selectProps(state, modelId),
    shallowEqual
  )

  const addProp = (name: string) =>
    dispatch(addPropName({ propName: name, uuid: modelId }))

  return (
    <FlexboxGrid justify="start">
      <FlexboxGrid.Item>
        <IconButton
          disabled={disableModalControllers}
          icon={<Icon icon="plus" />}
          size="xs"
          color="cyan"
          id={isTourOpen ? 'add-attribute-btn' : null}
          onClick={toggleShowPropNameModal}
        >
          <b>Add attribute</b>
        </IconButton>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <IconButton
          id={isTourOpen ? 'generate-data-btn' : null}
          style={{ marginLeft: '5px' }}
          size="xs"
          disabled={disableModalControllers}
          icon={<Icon icon="magic2" />}
          onClick={() => generate()}
        >
          Generate JSON
        </IconButton>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <LanguageSelector
          modelId={modelId}
          disableModalControllers={disableModalControllers}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item style={{ marginLeft: '5px' }}>
        <InputNumber
          size="xs"
          disabled={disableModalControllers}
          defaultValue={`${amount}`}
          max={1000000}
          min={1}
          onChange={changeAmount}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <IconButton
          id={isTourOpen ? 'generate-graphql-schema-btn' : null}
          style={{ marginLeft: '5px' }}
          size="xs"
          disabled={disableModalControllers}
          icon={
            <SiGraphqlContainer className="rs-icon">
              <SiGraphql color="#dd34a6" />
            </SiGraphqlContainer>
          }
          onClick={() => {
            toggleShowModal()
            setGraphQl(toGraphQl(modelProps, modelName))
          }}
        />
      </FlexboxGrid.Item>
      {/* @ts-ignore */}
      <AddProp
        id={modelId}
        showPropNameModal={showPropNameModal}
        closeConfirmModal={toggleShowPropNameModal}
        name={modelName}
        addProp={addProp}
      />

      {showModal && !!graphql.length && (
        <GraphQlModel graphql={graphql} toggleShowModal={toggleShowModal} />
      )}
    </FlexboxGrid>
  )
}

export default memo(ModelSubHeader)
