import React from 'react'

const ScheduleTimeline = props => {
	console.log(props.hour)
	console.log(props.min)
	return (
		<div className='ScheduleTimeline__hour' style={{ left: props.min }}>
			{props.hour ? `${props.hour}:00` : ''}
		</div>
	)
}

export default ScheduleTimeline
