import React, { memo } from 'react'
import { SiJavascript, SiPython, SiPhp, SiRuby } from 'react-icons/si'
import { DiMysql } from 'react-icons/di'

const RenderLangIcon = ({ lang }) => {
  return (
    <>
      {lang === 'php' && <SiPhp color="#474A8A" />}
      {lang === 'python' && <SiPython color="#34709f" />}
      {lang === 'javascript' && <SiJavascript color="#e8d44d" />}
      {lang === 'ruby' && <SiRuby color="#e51521" />}
      {lang === 'sql' && <DiMysql color="#F2913D" />}
    </>
  )
}

export default memo(RenderLangIcon)
