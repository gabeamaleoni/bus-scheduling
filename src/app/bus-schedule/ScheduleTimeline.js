import React from 'react'

const ScheduleTimeline = props => {
	return (
		<div className='ScheduleTimeline__hour' style={{ left: props.min }}>
			{props.hour ? `${props.hour}:00` : ''}
		</div>
	)
}

export default ScheduleTimeline
