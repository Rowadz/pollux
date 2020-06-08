import React, { useState } from 'react'
import { Grid, Row, Col } from 'rsuite'
import { IconButton, Icon } from 'rsuite'
import { AddModelBtn } from './components'
function Controller() {
  const [state, setState] = useState()
  return (
    <Grid fluid>
      <Row>
        <Col xs={24} sm={24} md={6}>
          <AddModelBtn />
        </Col>
      </Row>
    </Grid>
  )
}

export default Controller
