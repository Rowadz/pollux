import React from 'react'
import { IconButton } from 'rsuite'
import { ImLinkedin, ImGithub, ImYoutube } from 'react-icons/im'

const FooterComp = () => {
  return (
    <section style={{ textAlign: 'center' }}>
      Made by <b>Rowadz</b>{' '}
      <a
        href="https://www.linkedin.com/in/mohammed-al-rowad/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton size="xs" icon={<ImLinkedin />} />
      </a>
      {'  '}
      <a
        href="https://github.com/MohammedAl-Rowad"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton size="xs" icon={<ImGithub />} />
      </a>
      {'  '}
      <a
        href="https://www.youtube.com/channel/UC1Uw_GN4sodGisimwZNzMoA?view_as=subscriber"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton size="xs" icon={<ImYoutube />} />
      </a>
    </section>
  )
}

export default FooterComp
