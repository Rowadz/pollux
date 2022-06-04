import { Model as ModelType, ReduxState } from 'components/shared'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Panel, PanelGroup } from 'rsuite'
import empty from './empty.svg'
import Model from './ModelsComponents/Model'

const Image = styled.img`
    width: 100%
    height: 200px 
`

type ModelsProps = {
  isTourOpen: boolean
}

const selectModels = ({ models }: ReduxState) => models

const Models = ({ isTourOpen }: ModelsProps) => {
  const models = useSelector<ReduxState, ModelType[]>(
    selectModels,
    shallowEqual
  )

  return (
    <section id="models-section">
      {isTourOpen && (
        <Model
          model={{ id: '', name: 'Demo', amount: 10 }}
          isTourOpen={isTourOpen}
        />
      )}

      {!isTourOpen && (
        <PanelGroup>
          {!!models.length &&
            models.map((model: ModelType, i: number) => (
              <Model model={model} key={i} isTourOpen={isTourOpen} />
            ))}

          {!!!models.length && (
            <Panel
              bordered
              header="Add models to start!"
              style={{ textAlign: 'center' }}
            >
              <Image src={empty} loading="lazy" alt="empty-img" />
            </Panel>
          )}
        </PanelGroup>
      )}
    </section>
  )
}

export default Models
