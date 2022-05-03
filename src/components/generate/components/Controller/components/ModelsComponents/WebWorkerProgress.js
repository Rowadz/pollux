import React from 'react'
import { FlexboxGrid, Progress } from 'rsuite'
import { useSelector } from 'react-redux'

const WebWorkerProgress = () => {
  const s = useSelector((state) => state)
  console.log(s)

  //   if (!show) {
  //     return null
  //   }

  return (
    <FlexboxGrid justify="center" style={{ marginTop: '1rem' }}>
      <FlexboxGrid.Item>
        <div style={{ width: 80 }}>
          <Progress.Circle
            // percent={(generatedCount / amount) * 100}
            percent={100}
            status="active "
          />
        </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default WebWorkerProgress
