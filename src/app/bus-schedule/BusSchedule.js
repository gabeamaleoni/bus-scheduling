import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onBusScheduleLoad, onTripSelect, onBusSelect } from './duck/actions'
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
		// console.log('id: ', id)
		this.props.dispatch(onTripSelect({ id: id }))
	}

	onBusSelect = busIdx => {
		if (this.props.busSchedule.selectedTrip) {
			// console.log('onBusSelect busIdx: ', busIdx)
			this.props.dispatch(onBusSelect(busIdx))
		}
	}

	render() {
		let busArr = this.props.busSchedule.busArr
		return (
			<section className='BusSchedule'>
				<div className='BusSchedule__inner'>
					{busArr.length ? (
						busArr.map((bus, idx) => {
							// console.log('bus: ', bus)
							return (
								<BusRow
									onTripSelect={this.onTripSelect}
									onBusSelect={this.onBusSelect}
									key={idx}
									idx={idx}
									id={bus.id}
									selectedTrip={
										this.props.busSchedule.selectedTrip
											? this.props.busSchedule.selectedTrip.id
											: ''
									}
									calculateWidth={this.calculateWidth}
									trips={bus.trips}
								/>
							)
						})
					) : (
						<p>No bus schedule data</p>
					)}
				</div>
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
