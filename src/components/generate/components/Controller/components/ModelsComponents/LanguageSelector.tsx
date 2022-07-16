import React, { useState } from 'react'
import { useToggle } from 'react-use'
import { Button, ButtonGroup, Dropdown, IconButton } from 'rsuite'
import RenderLangIcon from './RenderLangIcon'
import { SiJavascript, SiPhp, SiPython, SiRuby } from 'react-icons/si'
import { DiMysql } from 'react-icons/di'
import CodeGenerator from './CodeGenerator'
import { Lang } from './types'

type LanguageSelectorProps = {
  modelId: string
  disableModalControllers: boolean
}

const LanguageSelector = ({
  disableModalControllers,
  modelId,
}: LanguageSelectorProps) => {
  const [lang, setLang] = useState<Lang>('ruby')
  const [showModal, toggleShowModal] = useToggle(false)
  return (
    <>
      <ButtonGroup style={{ marginLeft: '5px' }}>
        <Button
          disabled={disableModalControllers}
          onClick={toggleShowModal}
          size="xs"
        >
          <RenderLangIcon lang={lang} />
        </Button>
        <Dropdown
          disabled={disableModalControllers}
          placement="bottomEnd"
          onSelect={setLang}
          renderTitle={() => {
            return <IconButton size="xs" icon={<></>} />
          }}
        >
          <Dropdown.Item
            eventKey="php"
            icon={<SiPhp size="1rem" color="#474A8A" />}
          />
          <Dropdown.Item
            eventKey="python"
            icon={<SiPython size="1rem" color="#34709f" />}
          />
          <Dropdown.Item
            eventKey="javascript"
            icon={<SiJavascript size="1rem" color="#e8d44d" />}
          />
          <Dropdown.Item
            eventKey="ruby"
            icon={<SiRuby size="1rem" color="#e51521" />}
          />
          <Dropdown.Item
            eventKey="sql"
            icon={<DiMysql size="1rem" color="#F2913D" />}
          />
        </Dropdown>
      </ButtonGroup>
      {showModal && (
        <CodeGenerator
          toggleShowModal={toggleShowModal}
          modelId={modelId}
          lang={lang}
          key={`${showModal}-${lang}`}
        />
      )}
    </>
  )
}

export default LanguageSelector
