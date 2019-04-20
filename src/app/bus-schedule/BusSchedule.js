import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onBusScheduleLoad } from './duck/actions'
import busSchedulingInput from '../../utils/bus-scheduling-input'

class BusSchedule extends Component {
	componentDidMount() {
		this.props.dispatch(onBusScheduleLoad(busSchedulingInput))
	}

	render() {
		return <section>this is a scheduler</section>
	}
}

const mapStateToProps = state => ({
	busSchedule: state.busSchedule
})

export default connect(
	mapStateToProps,
	null // no mapDispatchToProps
)(BusSchedule)
