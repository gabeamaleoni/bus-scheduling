// bus-schedule/duck/actions.js
import * as types from './types'

export const onBusScheduleLoad = json => ({
	type: types.ON_BUS_SCHEDULE_LOAD,
	payload: json
})
