import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onBusScheduleLoad, onTripSelect } from './duck/actions'
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

	onTripSelect = id => {
		console.log('id', id)
		this.props.dispatch(onTripSelect({ id: id }))
	}

	calculateWidth = (startTime, endTime) => {
		const tripWidth = endTime - startTime
		return tripWidth
	}

	getSelectedTrip = id => {
		let isSelected = false
		if (this.props.busSchedule.selectedTrip) {
			isSelected = id === this.props.busSchedule.selectedTrip.id
		}
		return isSelected
	}

	render() {
		let busArr = this.props.busSchedule.busArr
		return (
			<section className='BusSchedule'>
				{busArr.length ? (
					busArr.map((bus, idx) => {
						const { startTime, endTime, id } = bus.trip
						return (
							<BusRow
								onTripSelect={() => this.onTripSelect(id)}
								key={id}
								isSelected={this.getSelectedTrip(id)}
								idx={idx}
								id={id}
								calculateWidth={this.calculateWidth}
								startTime={startTime}
								endTime={endTime}
							/>
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
