import React, { Component } from 'react'
import BusSchedule from './bus-schedule/BusSchedule'
import './AppBody.css'

class AppBody extends Component {
	render() {
		return (
			<div className='AppBody'>
				<header className='AppBody__header'>
					<h4>Bus Scheduling</h4>
				</header>
				<BusSchedule />
			</div>
		)
	}
}

export default AppBody
