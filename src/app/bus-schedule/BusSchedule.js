import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onBusScheduleLoad, onTripSelect, onAssignTrip } from './duck/actions'
import BusRow from './BusRow'
import ScheduleTimeline from './ScheduleTimeline'
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

	calculateEarliestTime = trips => {
		let allStartTimes = []
		let earliestTime

		trips.forEach(trip => {
			allStartTimes.push(trip.startTime)
		})

		earliestTime = Math.min(...allStartTimes)
		if (earliestTime && earliestTime !== Infinity) {
			earliestTime = new Date(earliestTime * 1000).toISOString().substr(15, 4)
		}
		return earliestTime
	}

	calculateLatestTime = trips => {
		let allEndTimes = []
		let latestTime

		trips.forEach(trip => {
			allEndTimes.push(trip.endTime)
		})

		latestTime = Math.max(...allEndTimes)
		if (latestTime && latestTime !== -Infinity) {
			latestTime = new Date(latestTime * 1000).toISOString().substr(15, 4)
		}
		return latestTime
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
				<div className='BusSchedule__timeline'>
					{this.props.busSchedule.scheduleTimeInHours &&
						this.props.busSchedule.scheduleTimeInHours.map(interval => {
							return (
								<ScheduleTimeline
									key={interval.hour}
									hour={interval.hour}
									min={interval.min}
								/>
							)
						})}
				</div>

				{busArr.length ? (
					busArr.map((bus, idx) => {
						// Only show bus routes that have trips, or if it's the last extra route
						return (bus.trips && bus.trips.length) ||
							idx === busArr.length - 1 ? (
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
								earliestTime={this.calculateEarliestTime}
								latestTime={this.calculateLatestTime}
								trips={bus.trips}
							/>
						) : (
							''
						)
					})
				) : (
					<p className='BusSchedule__message'>No bus schedule data</p>
				)}
				{this.props.busSchedule.errors.length ? (
					<p className='BusSchedule__error'>
						{this.props.busSchedule.errors[0]}
					</p>
				) : (
					''
				)}
			</section>
		)
	}
}

const mapStateToProps = state => ({
	busSchedule: state.busSchedule
})

export default connect(mapStateToProps)(BusSchedule)
