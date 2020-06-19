import React from 'react'
import { Controller } from './components'
import { Grid, Row, Col } from 'rsuite'

function Generate() {
  // const [state, setState] = useState()
  return (
    <Grid fluid>
      <Row style={{ margin: '1rem' }}>
        <Col xs={24} sm={24} md={24} style={{ marginTop: '20px' }}>
          <Controller />
        </Col>
      </Row>
    </Grid>
  )
}

export default Generate
