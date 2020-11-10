import React, { useState } from 'react'
import {
  Grid,
  Row,
  Col,
  IconButton,
  Icon,
  Whisper,
  Tooltip,
  Alert,
} from 'rsuite'
import Tour from 'reactour'
import { connect } from 'react-redux'
import { AddModelBtn, Models, SaveModel, LoadModel } from './components'
import {
  relationsPropsGetter,
  generate,
  relationsGetter,
  generateAPI,
} from './util'

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
    selector: '#create-a-api-btn-for-all',
    content: () => (
      <>
        <p>
          Click here to generate an API with all the models in the model section (this might take some time....).
        </p>
        <p>After generation you just need to</p>
        <ul>
          <li>unzip the folder</li>
          <li>`cd pollux-api`</li>
          <li>`npm i`</li>
        </ul>
        <p>then you are done</p>
      </>
    )
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
  {
    selector: '#create-a-api-btn',
    content: () => (
      <>
        <p>
          Click here to generate a json-server API from this model, after
          generation you just need to
        </p>
        <ul>
          <li>unzip the folder</li>
          <li>`cd pollux-api`</li>
          <li>`npm i`</li>
        </ul>
        <p>then you are done</p>
      </>
    ),
  },
].map((obj) => ({
  ...obj,
  style: {
    backgroundColor: '#0f131a',
  },
}))

const generateAPIForAll = (models, prop, relations) => {
  if (models.length === 0) {
    Alert.warning('Plz load/create some models first')
    return
  }
  const data = models.reduce((prev, { name, amount, id }) => {
    return {
      ...prev,
      [name]: generate(
        prop[id],
        name,
        amount,
        relationsGetter({ relations, models }, id),
        relationsPropsGetter({ relations, prop }, id),
        true
      ),
    }
  }, {})
  generateAPI(
    models.map(({ name }) => name).join(' || '),
    null,
    null,
    null,
    null,
    data
  )
}

function Controller({ models, prop, relations }) {
  const [isTourOpen, setIsTourOpen] = useState(false)

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
            <Whisper
              placement="right"
              trigger="hover"
              speaker={
                <Tooltip>
                  Click here to generate a json-server API from this model
                </Tooltip>
              }
            >
              <IconButton
                id="create-a-api-btn-for-all"
                icon={<Icon icon="twinkle-star" />}
                style={{ marginLeft: '5px' }}
                color="blue"
                circle
                onClick={() => generateAPIForAll(models, prop, relations)}
              />
            </Whisper>
          </div>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Models isTourOpen={isTourOpen} />
        </Col>
      </Row>
    </Grid>
  )
}

export default connect(({ models, prop, relations }, ownProps) => ({
  ...ownProps,
  models,
  prop,
  relations,
}))(Controller)
