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
			onClick={() => props.onAssignTrip(props.busIdx)}>
			{/* {console.log('Row props', props)} */}
			{props.trips && props.trips.length
				? props.trips.map((trip, idx) => {
						return (
							<div
								key={idx}
								className={`BusSchedule__trip ${
									getSelectedTrip(trip.id, props) ? 'is-selected' : ''
								}`}
								onClick={e => props.onTripSelect(e, trip.id, props.busIdx)}
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
