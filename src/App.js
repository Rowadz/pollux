import React from 'react'
import 'rsuite/dist/styles/rsuite-dark.css'
import './App.css'
import { Header, Content, Footer, Generate } from './components/'
import { HashRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <Route path="/pollux" exact={true}>
        <main>
          <Content />
          <Footer />
        </main>
      </Route>
      <Route path="/pollux/generate">
        <Generate />
        <Footer />
      </Route>
    </Router>
  )
}

export default App
