import React from 'react'
import { checkIfTripsConflict } from './duck/actions'

const BusRow = props => {
	return (
		<div className={`BusRow ${props.selectedTrip ? 'is-hoverable' : ''}`}>
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
				{console.log('props.selectedTrip: ', props)}
				{props.selectedTrip &&
				!checkIfTripsConflict(props.trips, props.selectedTrip) ? (
					<div
						onClick={() => props.onAssignTrip(props.busIdx)}
						className='BusRow__trip BusRow__trip_potential'
						style={{
							left: props.selectedTrip.startTime,
							width: props.calculateWidth(
								props.selectedTrip.startTime,
								props.selectedTrip.endTime
							)
						}}>
						+
					</div>
				) : (
					''
				)}
				{props.trips && props.trips.length
					? props.trips.map((trip, idx) => {
							return (
								<div
									key={idx}
									className={`BusRow__trip ${
										props.selectedTrip && trip.id === props.selectedTrip.id
											? 'is-selected'
											: ''
									}`}
									onClick={e => props.onTripSelect(e, trip, props.busIdx)}
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
