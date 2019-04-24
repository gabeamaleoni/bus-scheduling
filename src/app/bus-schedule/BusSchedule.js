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

	calculateTimeframe = params => {
		let allTimes = []
		let timeToShow

		params.trips.forEach(trip => {
			allTimes.push(
				params.timeframe === 'earliest' ? trip.startTime : trip.endTime
			)
		})

		timeToShow =
			params.timeframe === 'earliest'
				? Math.min(...allTimes)
				: Math.min(...allTimes)
		if (timeToShow && timeToShow !== Infinity && timeToShow !== -Infinity) {
			timeToShow = new Date(timeToShow * 1000).toISOString().substr(15, 4)
		}
		return timeToShow
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

	renderErrors = () => {
		return this.props.busSchedule.errors.length ? (
			<p className='BusSchedule__error'>{this.props.busSchedule.errors[0]}</p>
		) : (
			''
		)
	}

	renderTimeline = () => {
		return (
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
		)
	}

	renderBusRows = () => {
		let busArr = this.props.busSchedule.busArr
		return busArr.length ? (
			busArr.map((bus, idx) => {
				// Only show buses that have trips, or if it's the last provisional bus
				return (bus.trips && bus.trips.length) || idx === busArr.length - 1 ? (
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
						calculateTimeframe={this.calculateTimeframe}
						trips={bus.trips}
					/>
				) : (
					''
				)
			})
		) : (
			<p className='BusSchedule__message'>No bus schedule data</p>
		)
	}

	render() {
		return (
			<section className='BusSchedule'>
				{this.renderTimeline()}
				{this.renderBusRows()}
				{this.renderErrors()}
			</section>
		)
	}
}

const mapStateToProps = state => ({
	busSchedule: state.busSchedule
})

export default connect(mapStateToProps)(BusSchedule)
