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
		<div className='BusRow' onClick={() => props.onAssignTrip(props.busIdx)}>
			<div className='BusRow__left'>
				<span>
					{props.trips.length ? `Bus: ${props.busIdx + 1}` : 'New Bus'}
				</span>
				{props.trips && props.trips.length ? (
					<span className='BusRow__time-window'>
						{props.calculateTimeframe({
							trips: props.trips,
							timeframe: 'earliest'
						})}{' '}
						-{' '}
						{props.calculateTimeframe({
							trips: props.trips,
							timeframe: 'latest'
						})}{' '}
					</span>
				) : (
					''
				)}
			</div>
			<div className='BusRow__right'>
				{props.trips && props.trips.length
					? props.trips.map((trip, idx) => {
							return (
								<div
									key={idx}
									className={`BusRow__trip ${
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
		</div>
	)
}

export default BusRow
