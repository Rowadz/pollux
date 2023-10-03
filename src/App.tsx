import { useEffect } from 'react'
// import 'rsuite/dist/styles/rsuite-dark.css'
import './App.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Header, Content, Footer, Generate, FlowGenerate } from './components'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ErrorBoundary } from './ErrorBoundary'
import { FLAGS } from 'flags'
import { useDispatch } from 'react-redux'
import { toggleBuilderAction } from 'redux/actions'

console.log(
  `%c

'########:::'#######::'##:::::::'##:::::::'##::::'##:'##::::'##:
 ##.... ##:'##.... ##: ##::::::: ##::::::: ##:::: ##:. ##::'##::
 ##:::: ##: ##:::: ##: ##::::::: ##::::::: ##:::: ##::. ##'##:::
 ########:: ##:::: ##: ##::::::: ##::::::: ##:::: ##:::. ###::::
 ##.....::: ##:::: ##: ##::::::: ##::::::: ##:::: ##::: ## ##:::
 ##:::::::: ##:::: ##: ##::::::: ##::::::: ##:::: ##:: ##:. ##::
 ##::::::::. #######:: ########: ########:. #######:: ##:::. ##:
..::::::::::.......:::........::........:::.......:::..:::::..::
`,
  'color: #4E7F97'
)

console.log(
  '%cRepo: https://github.com/Rowadz/pollux',
  'color: #4E7F97; font-size: 20px'
)

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (key === 'b' || key === 'B') {
        dispatch(toggleBuilderAction())
      } else if (key === 'g' || key === 'G') {
        navigate('/generate')
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  })

  return (
    <ErrorBoundary>
      <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Content />
                <Footer />
              </>
            }
          />
          <Route
            path="/generate"
            element={
              <>
                <Generate />
                <Footer />
              </>
            }
          />
          {FLAGS.FLOW_GENERATE && (
            <Route
              path="/flow-generate"
              element={
                <>
                  <FlowGenerate />
                </>
              }
            />
          )}
        </Routes>
      </DndProvider>
    </ErrorBoundary>
  )
}

export default App
