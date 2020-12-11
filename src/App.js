import React from 'react'
import 'rsuite/dist/styles/rsuite-dark.css'
import './App.css'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Header, Content, Footer, Generate } from './components/'
import { HashRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
        <Header />
        <Route path="/" exact={true}>
          <main>
            <Content />
            <Footer />
          </main>
        </Route>
        <Route path="/generate">
          <Generate />
          <Footer />
        </Route>
      </DndProvider>
    </Router>
  )
}

export default App
