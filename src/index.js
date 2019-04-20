import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppBody from './app/AppBody'
import * as serviceWorker from './serviceWorker'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

const middleware = applyMiddleware(thunk, logger)
const store = createStore(rootReducer, middleware)

ReactDOM.render(
	<Provider store={store}>
		<AppBody />
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
