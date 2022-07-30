import React from 'react'
import { FlexboxGrid } from 'rsuite'
import styled from 'styled-components'
import bugs from './bugs.svg'

const FlexboxGridItem = styled(FlexboxGrid.Item)`
  display: flex;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 20rem;
  height: 20rem;
`

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  hasError?: boolean
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error)
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch() {
    console.log(
      '%cPlease open an issue there: https://github.com/MohammedAl-Rowad/pollux',
      'color: #4E7F97; font-size: 20px'
    )
  }

  render() {
    if (this.state.hasError) {
      return (
        <FlexboxGrid>
          <FlexboxGridItem colspan={24}>
            <h4>You did something I didn't test, not your falt.</h4>
          </FlexboxGridItem>
          <FlexboxGridItem colspan={24}>
            <Image src={bugs} loading="lazy" />
          </FlexboxGridItem>
          <FlexboxGridItem colspan={24}>
            <p>
              Please visit{' '}
              <a
                href="https://github.com/MohammedAl-Rowad/pollux"
                target="_blank"
                rel="noreferrer noopener"
              >
                MohammedAl-Rowad/pollux
              </a>{' '}
              and open an issue
            </p>
          </FlexboxGridItem>
        </FlexboxGrid>
      )
    }

    return this.props.children
  }
}
