import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onBusScheduleLoad, onTripSelect, onAssignTrip } from './duck/actions'
import BusRow from './BusRow'
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

	onTripSelect = (event, id, busIdx) => {
		event.stopPropagation()
		this.props.dispatch(onTripSelect({ id: id, busIdx: busIdx }))
	}

	onAssignTrip = targetBusIdx => {
		if (this.props.busSchedule.selectedTrip) {
			this.props.dispatch(onAssignTrip(targetBusIdx))
		}
	}

	render() {
		let busArr = this.props.busSchedule.busArr
		return (
			<section className='BusSchedule'>
				<div className='BusSchedule__inner'>
					{busArr.length ? (
						busArr.map((bus, idx) => {
							// console.log(bus)
							return bus.trips && bus.trips.length ? (
								<BusRow
									onTripSelect={this.onTripSelect}
									onAssignTrip={this.onAssignTrip}
									key={idx}
									busIdx={idx}
									id={bus.id}
									selectedTrip={
										this.props.busSchedule.selectedTrip
											? this.props.busSchedule.selectedTrip.id
											: ''
									}
									calculateWidth={this.calculateWidth}
									trips={bus.trips}
								/>
							) : (
								''
							)
						})
					) : (
						<p>No bus schedule data</p>
					)}
					{this.props.busSchedule.errors.length ? (
						<p className='BusSchedule__error'>
							{this.props.busSchedule.errors[0]}
						</p>
					) : (
						''
					)}
				</div>
			</section>
		)
	}
}

const mapStateToProps = state => ({
	busSchedule: state.busSchedule
})

export default connect(mapStateToProps)(BusSchedule)
