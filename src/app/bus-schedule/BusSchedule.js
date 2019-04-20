import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onBusScheduleLoad } from './duck/actions'
import busSchedulingInput from '../../utils/bus-scheduling-input'

class BusSchedule extends Component {
	componentDidMount() {
		this.props.dispatch(onBusScheduleLoad(busSchedulingInput))
	}

	render() {
		let busArr = this.props.busSchedule.busArr
		return (
			<section className='BusSchedule'>
				{busArr.length ? (
					busArr.map((bus, idx) => {
						return <div key={idx}>bus {bus}</div>
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
