import React from 'react'
import { connect } from 'react-redux'
import { Panel, PanelGroup } from 'rsuite'
import empty from './empty.svg'
const Models = ({ models }) => {
  console.log(models)
  const modelsEls =
    models.length > 0 ? (
      models.map(({ id, name, createdAt }, i) => (
        <Panel bordered key={i} header={`Model name ${name}`}></Panel>
      ))
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

export default connect(({ models }) => models)(Models)
