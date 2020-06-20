import React from 'react'
import { connect } from 'react-redux'
import cat from './cat.svg'

const PropsDisplay = ({ id, props }) => {
  const propsEl = props ? (
    props.map(({ propName }, i) => <h4 key={i}>{propName}</h4>)
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
