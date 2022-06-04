import React, { useEffect, useState, memo } from 'react'
import { Button, Modal, Alert, IconButton, Icon } from 'rsuite'
import { generate } from '../../util'
import RenderLangIcon from './RenderLangIcon'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import { php } from '@codemirror/lang-php'
import { StreamLanguage } from '@codemirror/stream-parser'
import { format } from 'sql-formatter'
import { ruby } from '@codemirror/legacy-modes/mode/ruby'
import { python } from '@codemirror/legacy-modes/mode/python'
import { sql } from '@codemirror/legacy-modes/mode/sql'
// @ts-ignore
import json2php from 'json2php'
import dayjs from 'dayjs'
import { Lang } from './types'
import { shallowEqual, useSelector } from 'react-redux'
import {
  FakerProp,
  Model,
  ReduxState,
  Relation,
  RelationProps,
  selectModel,
  selectProps,
  selectRelations,
  selectRelationsProps,
} from 'components/shared'

const formatRuby = (data: number | Date) =>
  typeof data === 'number'
    ? data
    : dayjs(data).isValid()
    ? `'${dayjs(data).toISOString()}'`
    : `'${data}'`

type CodeGeneratorProps = {
  modelId: string
  lang: Lang
  toggleShowModal: () => any
}

const CodeGenerator = ({
  modelId,
  lang,
  toggleShowModal,
}: CodeGeneratorProps) => {
  const model: Model = useSelector<ReduxState, Model>(
    (state: ReduxState) => selectModel(state as any, modelId),
    shallowEqual
  )

  const modelProps: FakerProp[] = useSelector(
    (state: ReduxState) => selectProps(state, modelId),
    shallowEqual
  )

  const relations: Relation[] = useSelector(
    (state: ReduxState) => selectRelations(state, modelId),
    shallowEqual
  )

  const relationsProps: RelationProps[] = useSelector<
    ReduxState,
    RelationProps[]
  >(
    // @ts-expect-error
    (state) => selectRelationsProps(state, relations),
    shallowEqual
  )

  const [code, setCode] = useState('')
  useEffect(() => {
    const data =
      generate(
        modelProps,
        model.name,
        model.amount > 10_000 ? 10_000 : model.amount,
        relations,
        // @ts-expect-error
        relationsProps,
        true,
        modelId
      ) || []

    if (lang === 'javascript') {
      setCode(`const data = ${JSON.stringify(data, null, 2)};`)
    } else if (lang === 'php') {
      const phpArrayStr = json2php(JSON.parse(JSON.stringify(data, null, 2)))
      const phpArrayStrWithNewLines = `${phpArrayStr};`
        .replaceAll('array(array', 'array(\n array')
        .replaceAll('),', '), \n')
        .replaceAll(',', ', \n')
        .replace('));', ')\n );')
      setCode(`$data = ${phpArrayStrWithNewLines}`)
    } else if (lang === 'ruby') {
      // prettier-ignore
      // @ts-expect-error
      const rubyCode = data.map(obj => {
            return `{` + Object.keys(obj).reduce(
                (prev, curr) => `${curr}: ${isNaN(obj[curr]) ? `'${obj[curr]}'` : formatRuby(obj[curr]) }, ${prev}`, '') + `}`
                // @ts-expect-error
        }).map(str => {
            const lastIndexOf = str.lastIndexOf(', ')
            return str.slice(0, lastIndexOf) + str.slice(lastIndexOf + 2)
        }).join(',\n').replaceAll(',', ', \n')

      setCode(`[\n${rubyCode}\n]`)
    } else if (lang === 'python') {
      setCode(`data = ${JSON.stringify(data, null, 2)}`)
    } else if (lang === 'sql') {
      const data =
        generate(
          // @ts-expect-error
          props,
          model.name,
          model.amount > 10_000 ? 10_000 : model.amount,
          relations,
          // @ts-expect-error
          relationsProps,
          true,
          modelId
        ) || []
      // @ts-expect-error
      const values = data.map(Object.values)
      const res = []
      for (const list of values) {
        let str = '( '
        for (const [index, value] of list.entries()) {
          const comma = index === list.length - 1 ? ' ' : ', '
          if (isNaN(value)) {
            str += `"${value}"${comma}`
          } else {
            str += `${formatRuby(value)}${comma}`
          }
        }
        str += ')'
        res.push(str)
      }
      const sqlValues = res.join(', ')
      const sql = `
          INSERT INTO ${model.name} 
          VALUES ${sqlValues}
        `
      setCode(format(sql))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal size="lg" full show={true} onHide={toggleShowModal}>
      <Modal.Header>
        <Modal.Title>
          Copy this <RenderLangIcon lang={lang} /> code
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: 700, overflow: 'hidden' }}>
        <IconButton
          appearance="ghost"
          style={{ marginBottom: '5px' }}
          icon={<Icon icon="copy-o" />}
          onClick={() => {
            navigator.clipboard
              .writeText(code)
              .then(() => {
                Alert.info('Copied!')
              })
              .catch((error) => {
                console.error(error)
                Alert.error('Error')
              })
          }}
        >
          Copy
        </IconButton>

        <CodeMirror
          extensions={[
            javascript({ jsx: true }),
            php(),
            StreamLanguage.define(ruby),
            StreamLanguage.define(ruby),
            // @ts-expect-error
            StreamLanguage.define(sql),
            StreamLanguage.define(python),
          ]}
          theme={oneDark}
          value={code}
          height="300px"
          readOnly
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleShowModal} appearance="subtle">
          close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default memo(CodeGenerator)
