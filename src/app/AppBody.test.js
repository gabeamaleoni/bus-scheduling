import React from 'react'
import ReactDOM from 'react-dom'
import AppBody from './AppBody'

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<AppBody />, div)
	ReactDOM.unmountComponentAtNode(div)
})
