import React from 'react'
import { connect } from 'react-redux'
import { Panel, PanelGroup } from 'rsuite'
import empty from './empty.svg'
import Model from './ModelsComponents/Model'

const Models = ({ models, isTourOpen }) => {
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
    <section id="models-section">
      {isTourOpen ? (
        <Model
          model={{ id: '', name: 'Demo', createdAt: +new Date() }}
          isTourOpen={isTourOpen}
        />
      ) : (
        <PanelGroup>{modelsEls}</PanelGroup>
      )}
    </section>
  )
}

export default connect((models) => models)(Models)
