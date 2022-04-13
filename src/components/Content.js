import React from 'react'
import {
  Grid,
  Row,
  Col,
  Panel,
  Divider,
  Icon,
  Message,
  IconButton,
} from 'rsuite'
import prototype from './prototype.svg'
import prototype2 from './prototype2.svg'
import features from './features.svg'
import box from './box.svg'

const ContentComp = () => {
  return (
    <section>
      <Grid fluid className="site-layout-content">
        <Row>
          <Col xs={1} sm={1} md={6}></Col>
          <Col xs={24} sm={24} md={12}>
            <Panel bodyFill style={{ display: 'inline-block', width: '100%' }}>
              <img src={prototype} height="240" width={'100%'} alt="taken" />
              <Panel header={<h1>POLLUX</h1>} style={{ textAlign: 'center' }}>
                <h4>
                  <Icon icon="certificate" size="2x" /> The app that generate
                  fake data and{' '}
                  <a
                    href="https://github.com/typicode/json-server"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    json-server
                  </a>{' '}
                  APIs
                </h4>
              </Panel>
            </Panel>
          </Col>
          <Col xs={1} sm={1} md={6}></Col>
        </Row>
        <Divider />
        <Row>
          <Col xs={1} sm={1} md={6}></Col>
          <Col xs={24} sm={24} md={12}>
            <img src={prototype2} height="240" width={'100%'} alt="taken" />
            <Panel bodyFill style={{ display: 'inline-block', width: '100%' }}>
              <Panel
                header={<h1>Prototype</h1>}
                style={{ textAlign: 'center' }}
              >
                <h4>
                  <Icon icon="certificate" size="2x" /> Define prototypes and
                  their properties
                </h4>
              </Panel>
            </Panel>
          </Col>
          <Col xs={1} sm={1} md={6}></Col>
        </Row>
        <Divider />
        <Row>
          <Col xs={1} sm={1} md={6}></Col>
          <Col xs={24} sm={24} md={12}>
            <img src={box} height="240" width={'100%'} alt="taken" />
            <Panel bodyFill style={{ display: 'inline-block', width: '100%' }}>
              <Panel header={<h1>Generate</h1>} style={{ textAlign: 'center' }}>
                <h4>
                  <Icon icon="certificate" size="2x" /> Generate fake data and{' '}
                  <a
                    href="https://github.com/typicode/json-server"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    json-server
                  </a>{' '}
                  API's based on your prototypes
                </h4>
              </Panel>
            </Panel>
          </Col>
          <Col xs={1} sm={1} md={6}></Col>
        </Row>
        <Divider />
        <Row>
          <Col xs={1} sm={1} md={6}></Col>
          <Col xs={24} sm={24} md={12}>
            <img src={features} height="240" width={'100%'} alt="taken" />
            <Panel bodyFill style={{ display: 'inline-block', width: '100%' }}>
              <Panel header={<h1 style={{ textAlign: 'center' }}>Features</h1>}>
                <Message
                  showIcon
                  type="info"
                  title={
                    <h6>
                      Most of{' '}
                      <a
                        href="https://github.com/marak/Faker.js/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        faker
                      </a>
                      's functions
                    </h6>
                  }
                />
                <Message
                  showIcon
                  type="info"
                  title={
                    <h6>
                      <a
                        href="https://github.com/typicode/json-server"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        json-server
                      </a>{' '}
                      intergration
                    </h6>
                  }
                />
                <Message
                  showIcon
                  type="info"
                  title={<h6>one to many relations between models</h6>}
                />
                <Message
                  showIcon
                  type="info"
                  title={
                    <h6>
                      Drag Drop interface for selecting{' '}
                      <a
                        href="https://github.com/marak/Faker.js/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        faker
                      </a>
                      's functions in an easy way
                    </h6>
                  }
                />
                <Message
                  showIcon
                  type="warning"
                  title={
                    <h6>
                      lost? checkout these videos{' '}
                      <a
                        href="https://www.youtube.com/watch?v=Vh0M0oNo7Gc&t=9s"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        #1
                      </a>{' '}
                      <a
                        href="https://youtu.be/4Kwv98RDoSM"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        #2
                      </a>{' '}
                      <a
                        href="https://youtu.be/Vh0M0oNo7Gc"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        #3
                      </a>{' '}
                      <a
                        href="https://youtu.be/M8XhhTzK00g"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        #4
                      </a>{' '}
                      or click on the{' '}
                      <IconButton
                        icon={<Icon icon="twinkle-star" />}
                        color="blue"
                        circle
                      />{' '}
                      icon
                    </h6>
                  }
                />
                <Message
                  showIcon
                  type="warning"
                  title={
                    <h6>
                      Repo{' '}
                      <a
                        href="https://github.com/MohammedAl-Rowad/pollux"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </a>
                    </h6>
                  }
                />
              </Panel>
            </Panel>
          </Col>
          <Col xs={1} sm={1} md={6}></Col>
        </Row>
      </Grid>
    </section>
  )
}

export default ContentComp
