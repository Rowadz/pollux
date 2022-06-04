import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useToggle } from 'react-use'
import { addPropName } from 'redux/actions'
import { FlexboxGrid, Icon, IconButton, InputNumber } from 'rsuite'
import { generate } from '../../util'
import AddProp from './AddProp'
import LanguageSelector from './LanguageSelector'

type ModelSubHeaderProps = {
  disableModalControllers: boolean
  isTourOpen: boolean
  modelName: string
  modelId: string
  amount: number
  changeAmount: (val: string | number) => void
  generate: () => ReturnType<typeof generate>
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
  const [showPropNameModal, toggleShowPropNameModal] = useToggle(false)
  const dispatch = useDispatch()

  const addProp = (name: string) =>
    dispatch(addPropName({ propName: name, uuid: modelId }))

  return (
    <FlexboxGrid justify="start">
      <FlexboxGrid.Item>
        <IconButton
          disabled={disableModalControllers}
          icon={<Icon icon="plus" />}
          size="xs"
          id={isTourOpen ? 'add-attribute-btn' : null}
          onClick={toggleShowPropNameModal}
        >
          Add attribute
        </IconButton>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <IconButton
          id={isTourOpen ? 'generate-data-btn' : null}
          style={{ marginLeft: '5px' }}
          size="xs"
          disabled={disableModalControllers}
          icon={<Icon icon="magic2" />}
          onClick={generate}
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
      {/* @ts-ignore */}
      <AddProp
        id={modelId}
        showPropNameModal={showPropNameModal}
        closeConfirmModal={toggleShowPropNameModal}
        name={modelName}
        addProp={addProp}
      />
    </FlexboxGrid>
  )
}

export default memo(ModelSubHeader)
