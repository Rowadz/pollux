import React from 'react'
import { connect } from 'react-redux'
import cat from './cat.svg'
import { List } from 'rsuite'
import Prop from './Prop'

const PropsDisplay = ({ id, props, modelName }) => {
  console.log({ props })
  const propsEl =
    props && props?.length > 0 ? (
      <List hover>
        {props.map(({ propName, id: uuid }, i) => (
          <Prop
            i={i}
            key={i}
            name={propName}
            id={uuid}
            modelId={id}
            modelName={modelName}
          />
        ))}
      </List>
    ) : (
      <section style={{ width: '100%', textAlign: 'center' }}>
        <h5>Add Properties to this model using the + button</h5>
        <img src={cat} alt="cat waiting" width={'100px'} height={'100px'} />
      </section>
    )
  return <section>{propsEl}</section>
}

export default connect((state, ownProps) => ({
  ...ownProps,
  props: state.prop[ownProps.id],
}))(PropsDisplay)
