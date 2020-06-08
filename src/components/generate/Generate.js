import React, { useState } from 'react'
import { Controller } from './components'
import { Grid, Row, Col, Container, Content } from 'rsuite'

function Generate() {
  const [state, setState] = useState()
  return (
    // <Container >
    //   <Content>
    <Grid fluid>
      <Row style={{ margin: '1rem' }}>
        <Col xs={24} sm={24} md={24} style={{ marginTop: '20px' }}>
          <Controller />
        </Col>
      </Row>
    </Grid>
    //   </Content>
    // </Container>
  )
}

export default Generate
