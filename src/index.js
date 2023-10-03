import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Pollux from './App'
import { HashRouter as Router } from 'react-router-dom'
// import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './redux/store'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Pollux />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
