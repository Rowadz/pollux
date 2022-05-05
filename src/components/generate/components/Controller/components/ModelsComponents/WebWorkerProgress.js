import React, { useEffect, useCallback, useState } from 'react'
import { FlexboxGrid, Progress } from 'rsuite'
import { useSelector } from 'react-redux'
import { eventEmitter } from 'components/generate/webWorker/eventEmitter'

const WebWorkerProgress = ({ modelId, relations }) => {
  const [generated, setGenereated] = useState(0)
  const [startedWorkersCount, setStartedWorkersCount] = useState(0)
  const [currentWebWorkerModelId, setModelId] = useState('')
  // const [started, setStarted] = useState(false)
  const modelSelector = useCallback(
    (state) => state.models.filter(({ id }) => id === modelId)[0],
    [modelId]
  )

  const relCount = relations.reduce((prev, { amount }) => prev + amount, 0)
  const model = useSelector(modelSelector)
  const totalNumberOfDocumentsToBeGenerated = relCount
    ? model?.amount * relCount
    : model?.amount

  useEffect(() => {
    eventEmitter.on('DOCUMENT_GENERATED', () => {
      setGenereated((prev) => prev + 1)
    })
    eventEmitter.on(
      'STARTED',
      (() => {
        const maxWorkers = navigator.hardwareConcurrency || 4
        let counter = 0
        return ({ modelId }) => {
          counter++
          setStartedWorkersCount((prev) => prev + 1)
          // setStarted(true)
          setModelId(modelId)
          if (counter === maxWorkers) {
            setTimeout(() => setGenereated(0), 1000)
            counter = 0
          }
        }
      })()
    )
    eventEmitter.on(
      'STOPPED',
      (() => {
        const maxWorkers = navigator.hardwareConcurrency || 4
        let counter = 0
        return () => {
          counter++
          // means that all the workers are done
          if (counter === maxWorkers) {
            setTimeout(() => setGenereated(0), 1000)
            setTimeout(() => setStartedWorkersCount(0), 1000)
            counter = 0
          } else {
            setStartedWorkersCount((prev) => prev - 1)
          }
        }
      })()
    )
  }, [])

  if (!generated || currentWebWorkerModelId !== modelId) {
    return null
  }

  return (
    <FlexboxGrid justify="center" style={{ marginTop: '1rem' }}>
      <FlexboxGrid.Item>
        <FlexboxGrid
          justify="center"
          style={{ flexDirection: 'column' }}
          align="middle"
        >
          <div>
            Data denerated <b>{generated?.toLocaleString() || generated}</b> /{' '}
            {totalNumberOfDocumentsToBeGenerated?.toLocaleString() ||
              totalNumberOfDocumentsToBeGenerated}
          </div>
          <div style={{ width: 80 }}>
            <Progress.Circle
              percent={(
                (generated / totalNumberOfDocumentsToBeGenerated) *
                100
              ).toFixed(2)}
              status={
                generated === totalNumberOfDocumentsToBeGenerated
                  ? 'success'
                  : 'active'
              }
            />
          </div>
        </FlexboxGrid>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item style={{ flexGrow: 0.4 }} />
      <FlexboxGrid.Item>
        <FlexboxGrid
          justify="center"
          style={{ flexDirection: 'column' }}
          align="middle"
        >
          <div>
            Workers running <b>{startedWorkersCount}</b> /{' '}
            {navigator.hardwareConcurrency || 4}
          </div>
          <div style={{ width: 80, marginLeft: 20 }}>
            <Progress.Circle
              strokeColor="#ffc107"
              showInfo={false}
              percent={Math.floor(
                (startedWorkersCount / (navigator.hardwareConcurrency || 4)) *
                  100
              )}
            />
          </div>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default WebWorkerProgress
