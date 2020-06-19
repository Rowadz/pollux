import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Icon,
  IconButton,
  Panel,
  Button,
  PanelGroup,
  Grid,
  Row,
  Col,
  Whisper,
  Tooltip,
  Modal,
} from 'rsuite'
import { deleteModel } from '../../../../../redux/actions'
import empty from './empty.svg'
import Model from './ModelsComponents/Model'
const { Body, Footer } = Modal

const delToolTip = (
  <Tooltip>
    Click here to <b>Delete</b> this model.
  </Tooltip>
)

const Models = ({ models, dispatch }) => {
  const modelsEls =
    models.length > 0 ? (
      models.map((model, i) => <Model model={model} key={i} />)
    ) : (
      <Panel
        bordered
        header="Add models to start!"
        style={{ textAlign: 'center' }}
      >
        <img src={empty} with={'100%'} height={'200px'} alt="empty-img" />
      </Panel>
    )
  return (
    <section>
      <PanelGroup accordion={modelsEls.length > 0} bordered>
        {modelsEls}
      </PanelGroup>
    </section>
  )
}

export default connect((models) => models)(Models)
