import React from 'react'

const getSelectedTrip = (id, props) => {
	let isSelected = false
	if (props.selectedTrip) {
		isSelected = id === props.selectedTrip
	}
	return isSelected
}

const BusRow = props => {
	return (
		<div
			className='BusSchedule__row'
			onClick={() => props.onBusSelect(props.idx)}>
			{props.trips && props.trips.length
				? props.trips.map((trip, idx) => {
						return (
							<div
								key={idx}
								className={`BusSchedule__trip ${
									getSelectedTrip(trip.id, props) ? 'is-selected' : ''
								}`}
								onClick={() => props.onTripSelect(trip.id)}
								style={{
									left: trip.startTime,
									width: props.calculateWidth(trip.startTime, trip.endTime)
								}}>
								{trip.id}
							</div>
						)
				  })
				: ''}
		</div>
	)
}

export default BusRow
