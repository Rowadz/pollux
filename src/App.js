import React from 'react'
// import 'rsuite/dist/styles/rsuite-dark.css'
import './App.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Header, Content, Footer, Generate, FlowGenerate } from './components'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { FLAGS } from 'flags'

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
  '%cRepo: https://github.com/MohammedAl-Rowad/pollux',
  'color: #4E7F97; font-size: 20px'
)

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Content />
                <Footer />
              </main>
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
                  <Footer />
                </>
              }
            />
          )}
        </Routes>
      </DndProvider>
    </Router>
  )
}

export default App
