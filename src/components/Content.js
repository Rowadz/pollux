import React from 'react'
import { Col, FlexboxGrid } from 'rsuite'
import prototype from './prototype.svg'

import { normal } from '../colors'
import faq from './faq.svg'
import dataExtraction from './data-extraction.svg'
import {
  SiJavascript,
  SiPython,
  SiPhp,
  SiRuby,
  SiGraphql,
} from 'react-icons/si'

import styled from 'styled-components'

const FlexboxGridWithSpacing = styled(FlexboxGrid)`
  margin: 1rem;
  align-items: center;
  justify-content: center;
`

const FlexboxGridItemWithSpacing = styled(FlexboxGrid.Item)`
  padding: 1rem;
`

const Image = styled.img`
  height: 240px;
  width: 100%;
`

const Text = styled.p`
  font-size: 1.4rem;
`

const CenterText = styled.p`
  text-align: center;
  font-size: 2rem;
`

const TextUnderline = styled.span`
  text-decoration: underline wavy ${normal};
  text-underline-offset: 3px;
`

const ContentComp = () => {
  return (
    <>
      <FlexboxGridWithSpacing>
        <FlexboxGridItemWithSpacing colspan={24}>
          <CenterText>
            <span role="img" aria-label="sun">
              🌞
            </span>
            Pollux
            <span role="img" aria-label="sun">
              🌞
            </span>
          </CenterText>
        </FlexboxGridItemWithSpacing>
      </FlexboxGridWithSpacing>
      <FlexboxGridWithSpacing>
        <FlexboxGridItemWithSpacing
          componentClass={Col}
          colspan={11}
          sm={24}
          xs={24}
          md={11}
        >
          <Image src={faq} loading="lazy" />
        </FlexboxGridItemWithSpacing>
        <FlexboxGridItemWithSpacing colspan={2} componentClass={Col} smHidden />
        <FlexboxGridItemWithSpacing
          componentClass={Col}
          colspan={11}
          sm={24}
          xs={24}
          md={11}
        >
          <Text>
            Need Restful API with bearer authentication? or a GraphQL{' '}
            <SiGraphql color="#dd34a6" size="1rem" /> API? maybe some testing
            data in JSON or Ruby <SiRuby color="#e51521" size="1rem" /> or
            Python <SiPython color="#34709f" size="1rem" /> or PHP{' '}
            <SiPhp color="#474A8A" size="1rem" /> or JavaScript{' '}
            <SiJavascript color="#e8d44d" size="1rem" />, all of that and more
            is possible with pollux,{' '}
            <TextUnderline>
              without writing a single line of code.{' '}
            </TextUnderline>
          </Text>
        </FlexboxGridItemWithSpacing>
      </FlexboxGridWithSpacing>
      <FlexboxGridWithSpacing>
        <FlexboxGridItemWithSpacing colspan={24}>
          <CenterText>
            <span role="img" aria-label="alembic">
              ⚗️
            </span>
            Who does it work
            <span role="img" aria-label="alembic">
              ⚗️
            </span>
          </CenterText>
        </FlexboxGridItemWithSpacing>
      </FlexboxGridWithSpacing>
      <FlexboxGridWithSpacing>
        <FlexboxGridItemWithSpacing
          componentClass={Col}
          colspan={11}
          sm={24}
          xs={24}
          md={11}
        >
          <Text>
            You create a model, then you can drag and drop properties into it,
            and these properties defines what kind of fake data should be
            generated
          </Text>
        </FlexboxGridItemWithSpacing>
        <FlexboxGridItemWithSpacing colspan={2} componentClass={Col} smHidden />
        <FlexboxGridItemWithSpacing
          componentClass={Col}
          colspan={11}
          sm={24}
          xs={24}
          md={11}
        >
          <Image src={prototype} loading="lazy" />
        </FlexboxGridItemWithSpacing>
      </FlexboxGridWithSpacing>
      <FlexboxGridWithSpacing>
        <FlexboxGridItemWithSpacing colspan={24}>
          <CenterText>
            <span role="img" aria-label="alembic">
              ✨
            </span>
            What makes it unique
            <span role="img" aria-label="alembic">
              ✨
            </span>
          </CenterText>
        </FlexboxGridItemWithSpacing>
      </FlexboxGridWithSpacing>
      <FlexboxGridWithSpacing>
        <FlexboxGridItemWithSpacing
          componentClass={Col}
          colspan={11}
          sm={24}
          xs={24}
          md={11}
        >
          <Image src={dataExtraction} loading="lazy" />
        </FlexboxGridItemWithSpacing>
        <FlexboxGridItemWithSpacing colspan={2} componentClass={Col} smHidden />
        <FlexboxGridItemWithSpacing
          componentClass={Col}
          colspan={11}
          sm={24}
          xs={24}
          md={11}
        >
          <Text>
            Everything in pollux from generating `.zip` files to generating
            500,000 model instances happens in the frontend, using web APIs such
            as the{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Blob"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blob API
            </a>{' '}
            and{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Workers API
            </a>
            , plus you can{' '}
            <TextUnderline>
              pass JavaScript RegExp and it will generate a random string based
              on that.
            </TextUnderline>
          </Text>
        </FlexboxGridItemWithSpacing>
      </FlexboxGridWithSpacing>
    </>
  )
}

export default ContentComp
