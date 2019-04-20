import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onBusScheduleLoad } from './duck/actions'
import busSchedulingInput from '../../utils/bus-scheduling-input'
import './BusSchedule.css'

class BusSchedule extends Component {
	componentDidMount() {
		this.props.dispatch(onBusScheduleLoad(busSchedulingInput))
	}

	calculateWidth = (startTime, endTime) => {
		const tripWidth = endTime - startTime
		return tripWidth
	}

	render() {
		let busArr = this.props.busSchedule.busArr
		return (
			<section className='BusSchedule'>
				{busArr.length ? (
					busArr.map((bus, idx) => {
						const { startTime, endTime, id } = bus.trip
						return (
							<div key={idx} className='BusSchedule__row'>
								{/* bus {bus.id} */}
								<div
									className='BusSchedule__trip'
									style={{
										left: startTime,
										width: this.calculateWidth(startTime, endTime)
									}}>
									{id}
								</div>
							</div>
						)
					})
				) : (
					<p>No bus schedule data</p>
				)}
			</section>
		)
	}
}

const mapStateToProps = state => ({
	busSchedule: state.busSchedule
})

export default connect(
	mapStateToProps,
	null // no mapDispatchToProps
)(BusSchedule)
