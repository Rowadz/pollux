import React from 'react'
import 'rsuite/dist/styles/rsuite-dark.css'
import './App.css'
import { Header, Content, Footer, Generate } from './components/'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <main>
        <Header />
        <Route path="/" exact={true}>
          <Content />
        </Route>
        <Route path="/generate">
          <Generate />
        </Route>
        <Footer />
      </main>
    </Router>
  )
}

export default App
