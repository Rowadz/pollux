import React, { memo, useEffect, useCallback, useState } from 'react'
import { FlexboxGrid, Progress } from 'rsuite'
import { useSelector } from 'react-redux'
import { eventEmitter } from 'components/generate/webWorker/eventEmitter'

const WebWorkerProgress = ({ modelId }) => {
  const [generated, setGenereated] = useState(0)
  const [currentWebWorkerModelId, setModelId] = useState('')
  const modelSelector = useCallback(
    (state) => state.models.filter(({ id }) => id === modelId)[0],
    [modelId]
  )

  const model = useSelector(modelSelector)

  useEffect(() => {
    eventEmitter.on('DOCUMENT_GENERATED', () => {
      setGenereated((prev) => prev + 1)
    })
    eventEmitter.on('STARTED', ({ modelId }) => {
      setGenereated(0)
      setModelId(modelId)
    })
    eventEmitter.on('STOPPED', () => {
      setGenereated(0)
    })
  }, [])

  console.log(generated, model?.amount)
  if (!generated || currentWebWorkerModelId !== modelId) {
    return null
  }

  return (
    <FlexboxGrid justify="center" style={{ marginTop: '1rem' }}>
      <FlexboxGrid.Item>
        <div style={{ width: 80 }}>
          <Progress.Circle
            percent={((generated / model?.amount) * 100).toFixed(2)}
            status={generated === model?.amount ? 'success' : 'active'}
          />
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default memo(WebWorkerProgress)
