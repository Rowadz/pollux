import React, { useState } from 'react'
import { Grid, Row, Col, IconButton, Icon } from 'rsuite'
// import { IconButton, Icon } from 'rsuite'
import Tour from 'reactour'
import { AddModelBtn, Models, SaveModel, LoadModel } from './components'

const steps = [
  {
    selector: '#add-prototype-btn',
    content: 'Click here to create new model aka prototype',
  },
  {
    selector: '#save-model-btn',
    content: `Click here to save models after you create them ( they are saved in your localstorage - hope you don't mind :p )`,
  },
  {
    selector: '#load-model-btn',
    content: 'Click here to load your saved models after you save them',
  },
  {
    selector: '#models-section',
    content: 'An empty model',
  },
  {
    selector: '#add-attribute-btn',
    content: 'Click here to add attributes (props) to this model',
  },
  {
    selector: '#prop-tag-count',
    content:
      'This number shows the number of attributes (props) this models have',
  },
  {
    selector: '#generate-data-btn',
    content: 'Click here to generate this model data with its related models',
  },
  {
    selector: '#create-a-relationship-btn',
    content: 'Click here to create a 1:m relation with another model',
  },
].map((obj) => ({
  ...obj,
  style: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}))

function Controller() {
  const [isTourOpen, setIsTourOpen] = useState(false)

  // const { tour } = state
  return (
    <Grid fluid>
      <Row>
        <Tour
          steps={steps}
          isOpen={isTourOpen}
          onRequestClose={() => setIsTourOpen(false)}
        />
        <Col xs={24} sm={24} md={6}>
          <AddModelBtn />
          <div style={{ marginTop: '10px' }}>
            <IconButton
              style={{ marginRight: 10 }}
              color="violet"
              onClick={() => setIsTourOpen(true)}
              circle
              icon={<Icon icon="lightbulb-o" />}
            />
            <SaveModel />
            <LoadModel />
          </div>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Models isTourOpen={isTourOpen} />
        </Col>
      </Row>
    </Grid>
  )
}

export default Controller
