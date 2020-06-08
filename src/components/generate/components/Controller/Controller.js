import React, { useState } from 'react'
import { Grid, Row, Col } from 'rsuite'
import { Button } from 'rsuite'

function Controller() {
  const [state, setState] = useState()
  return (
    <Grid fluid>
      <Row>
        <Col xs={24} sm={24} md={4}>
          <Button color="cyan" appearance="ghost">
            Add aodel prototype
          </Button>
        </Col>
      </Row>
    </Grid>
  )
}

export default Controller
