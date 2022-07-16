import React from 'react'
import { Badge, List } from 'rsuite'
import { HiIdentification } from 'react-icons/hi'
import { FaEnvelope, FaAddressBook } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { VscRegex } from 'react-icons/vsc'
import {
  BsFileEarmarkTextFill,
  BsChatLeftTextFill,
  BsImageFill,
} from 'react-icons/bs'

import { MdOutlinePassword } from 'react-icons/md'
import DraggableCommonProp from './components/DraggableCommonProp'

const CommonProps = () => {
  return (
    <>
      <h4>Common Items</h4>
      <List>
        <DraggableCommonProp type="UUID" icon={<HiIdentification />} />
        <DraggableCommonProp type="Email" icon={<FaEnvelope />} />
        <DraggableCommonProp type="REGEX" icon={<VscRegex />}>
          <Badge style={{ marginLeft: '1rem' }} content="NEW" />
        </DraggableCommonProp>
        <DraggableCommonProp type="Password" icon={<MdOutlinePassword />} />
        <DraggableCommonProp type="Full Name" icon={<FiUser />} />
        <DraggableCommonProp
          type="Paragraphs"
          icon={<BsFileEarmarkTextFill />}
        />
        <DraggableCommonProp type="Paragraph" icon={<BsChatLeftTextFill />} />
        <DraggableCommonProp type="IP" icon={<FaAddressBook />} />
        <DraggableCommonProp type="Image" icon={<BsImageFill />} />
      </List>
    </>
  )
}

export default CommonProps
