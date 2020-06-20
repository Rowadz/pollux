import React from 'react'
import { Grid, Row, Col, Panel } from 'rsuite'
import prototype from './prototype.svg'
import box from './box.svg'
import reactimg from './reactimg.svg'
import taken from './taken.svg'

const ContentComp = () => {
  return (
    <section>
      <Grid fluid className="site-layout-content">
        <Row>
          <Col xs={24} sm={24} md={12}>
            <Panel
              shaded
              bordered
              bodyFill
              style={{ display: 'inline-block', width: '100%' }}
            >
              <img src={taken} height="240" width={'100%'} alt="taken" />
              <Panel header="POLLUX">
                <p>Welcome to Pollux - The app that generate fake data</p>
              </Panel>
            </Panel>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Panel
              shaded
              bordered
              bodyFill
              style={{ display: 'inline-block', width: '100%' }}
            >
              <img
                src={reactimg}
                height="240"
                width={'100%'}
                alt="react
              "
              />
              <Panel header="Built via">
                <p>Built with React.js &#38; Redux</p>
              </Panel>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={12}>
            <Panel
              shaded
              bordered
              bodyFill
              style={{ display: 'inline-block', width: '100%' }}
            >
              <img
                src={prototype}
                height="240"
                width={'100%'}
                alt="prototype"
              />
              <Panel header="Prototype">
                <p>Define prototypes and their properties</p>
              </Panel>
            </Panel>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Panel
              shaded
              bordered
              bodyFill
              style={{ display: 'inline-block', width: '100%' }}
            >
              <img
                src={box}
                height="240"
                width={'100%'}
                alt="box
              "
              />
              <Panel header="Generate">
                <p>Generate fake data based on your prototypes</p>
              </Panel>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </section>
  )
}

export default ContentComp
