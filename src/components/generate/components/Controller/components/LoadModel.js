import React from 'react'
import React, { useState } from 'react'
import { IconButton, Icon, Modal, Button, Checkbox } from 'rsuite'
import { connect } from 'react-redux'
import emptySave from './emptySave.svg'
import { Alert } from 'rsuite'
const { Header, Body, Footer, Title } = Modal

export default function LoadModel() {
  return (
    <div>
      <IconButton
        color="cyan"
        onClick={showModalSave}
        circle
        icon={<Icon icon="save" />}
      />
    </div>
  )
}
