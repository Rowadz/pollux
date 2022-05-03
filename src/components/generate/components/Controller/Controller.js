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
  Toggle,
} from 'rsuite'
import Tour from 'reactour'
import { connect } from 'react-redux'
import { enableAuth, disableAuth } from 'redux/actions'
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
          Click here to generate an API with all the models in the model section
          (this might take some time....).
        </p>
        <p>After generation you just need to</p>
        <ul>
          <li>unzip the folder</li>
          <li>`cd pollux-api`</li>
          <li>`npm i`</li>
        </ul>
        <p>then you are done</p>
      </>
    ),
  },
  {
    selector: '#enable-jwt-auth',
    content: () => (
      <p>Toggle this to enable/disable JWT auth to any generated API</p>
    ),
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

const generateAPIForAll = (models, prop, relations, auth) => {
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
        true,
        id
      ),
    }
  }, {})
  generateAPI(
    models.map(({ name }) => name).join(' || '),
    null,
    null,
    null,
    null,
    data,
    auth
  )
}

function Controller({ models, prop, relations, auth, dispatch }) {
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

          <Row style={{ marginTop: '0.5rem' }}>
            <Col xs={8}>
              <IconButton
                size="xs"
                icon={<Icon icon="lightbulb-o" />}
                onClick={() => setIsTourOpen(true)}
              >
                Take Tour
              </IconButton>
            </Col>
            <Col xs={8}>
              <SaveModel />
            </Col>
            <Col xs={8}>
              <LoadModel />
            </Col>
          </Row>
          <Row style={{ marginTop: '0.5rem' }}>
            <Col xs={24}>
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
                  size="xs"
                  icon={<Icon icon="twinkle-star" />}
                  onClick={() =>
                    generateAPIForAll(models, prop, relations, auth)
                  }
                >
                  Generate Rest API with all models
                </IconButton>
              </Whisper>
            </Col>
          </Row>

          <div style={{ marginTop: '0.5rem' }} id="enable-jwt-auth">
            <Toggle
              onChange={() => dispatch(auth ? disableAuth() : enableAuth())}
              checkedChildren="Disable JWT Auth"
              unCheckedChildren="Enable JWT Auth"
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={18}>
          <Models isTourOpen={isTourOpen} />
        </Col>
      </Row>
    </Grid>
  )
}

export default connect(({ models, prop, relations, auth }, ownProps) => ({
  ...ownProps,
  models,
  prop,
  relations,
  auth,
}))(Controller)
