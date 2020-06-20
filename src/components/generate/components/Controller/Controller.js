import React from 'react'
import { Grid, Row, Col } from 'rsuite'
// import { IconButton, Icon } from 'rsuite'
import { AddModelBtn, Models, SaveModel } from './components'
function Controller() {
  // const [state, setState] = useState()
  return (
    <Grid fluid>
      <Row>
        <Col xs={24} sm={24} md={6}>
          <AddModelBtn />
          {/* <div style={{ marginTop: '10px' }}>
            <SaveModel />
          </div> */}
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Models />
        </Col>
      </Row>
    </Grid>
  )
}

export default Controller
