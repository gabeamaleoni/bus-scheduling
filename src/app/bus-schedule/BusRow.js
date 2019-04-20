import React from 'react'

const BusRow = props => {
	return (
		<div className='BusSchedule__row'>
			<div
				className={`BusSchedule__trip ${props.isSelected ? 'is-selected' : ''}`}
				onClick={() => props.onTripSelect(props.id)}
				style={{
					left: props.startTime,
					width: props.calculateWidth(props.startTime, props.endTime)
				}}>
				{props.id}
			</div>
		</div>
	)
}

export default BusRow
