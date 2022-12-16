import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'rsuite'
import { Grid, Row, Col } from 'rsuite'
import { Toggle } from 'rsuite'
import { addRelation, removeRelation } from 'redux/actions'
import { Alert } from 'rsuite'
import cat from './cat.svg'
import { ReduxState } from 'components/shared'
const { Body, Footer, Header, Title } = Modal

type CreateRelProps = {
  close: () => void
  id: string
  showCreateRel: boolean
}

const CreateRel = ({ showCreateRel, close, id }: CreateRelProps) => {
  const dispatch = useDispatch()

  const eligibleModels = useSelector(({ models }: ReduxState) =>
    (models || []).filter(({ id: _id }) => _id !== id)
  )

  const mainModel = useSelector(
    ({ models }: ReduxState) =>
      (models || []).filter(({ id: _id }) => _id !== id)[0]
  )

  const checkedModels = useSelector(
    ({ relations }: ReduxState) => new Set(relations[id] || [])
  )

  const toggleRel = (checked: boolean, distId: string) => {
    if (checked) {
      Alert.success(`created the link with ${mainModel.name} (1:m)`)
      dispatch(addRelation({ distId, modelId: id }))
    } else {
      Alert.info(`removed the link with ${mainModel.name}`)
      dispatch(removeRelation({ distId, modelId: id }))
    }
  }

  if (!mainModel) {
    return null
  }

  return (
    <Modal
      backdrop="static"
      onHide={close}
      show={showCreateRel}
      style={{ maxWidth: '100%' }}
      size="lg"
    >
      <Header>
        <Title>
          Create Relation for{' '}
          <span style={{ color: '#1b9cb0' }}>
            {mainModel.name.toUpperCase()}
          </span>{' '}
          model
        </Title>
      </Header>
      <Body>
        <h4>Eligible Models:</h4>
        <Grid fluid style={{ marginTop: 20 }}>
          <Row>
            {eligibleModels.length === 0 ? (
              <section style={{ width: '100%', textAlign: 'center' }}>
                <h5>
                  There is no eligible models, create models to link them!
                </h5>
                <img
                  src={cat}
                  alt="cat waiting"
                  width={'100px'}
                  height={'100px'}
                />
              </section>
            ) : (
              (eligibleModels || []).map(({ name, id }) => (
                <Col xs={24} sm={24} md={6} key={id}>
                  <span style={{ color: '#1b9cb0' }}>{name.toUpperCase()}</span>{' '}
                  <Toggle
                    style={{ marginLeft: 5 }}
                    onChange={(checked) => toggleRel(checked, id)}
                    checked={checkedModels.has(id)}
                  />
                </Col>
              ))
            )}
          </Row>
        </Grid>
      </Body>
      <Footer>
        <Button appearance="primary" color="cyan" onClick={close}>
          Ok
        </Button>
        <Button appearance="subtle" onClick={close}>
          Cancel
        </Button>
      </Footer>
    </Modal>
  )
}

export default memo(CreateRel)
