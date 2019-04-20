import React, { Component } from 'react'
import BusSchedule from './bus-schedule/BusSchedule'
import './AppBody.css'

class AppBody extends Component {
	render() {
		return (
			<div className='AppBody'>
				<header className='AppBody__header'>
					<h1>Bus Scheduling</h1>
					<BusSchedule />
				</header>
			</div>
		)
	}
}

export default AppBody
