import React from 'react'

const BusRow = props => {
	return (
		<div
			className={`BusRow ${props.selectedTrip ? 'is-hoverable' : ''}`}
			onClick={() => props.onAssignTrip(props.busIdx)}>
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
										trip.id === props.selectedTrip ? 'is-selected' : ''
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
