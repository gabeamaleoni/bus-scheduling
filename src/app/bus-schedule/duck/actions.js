// bus-schedule/duck/actions.js
import * as types from './types'

const acceptBusScheduleLoad = json => ({
	type: types.ON_BUS_SCHEDULE_LOAD,
	payload: json
})
export const onBusScheduleLoad = trips => dispatch => {
	const updatedTrips = []
	if (trips && trips.length) {
		trips.forEach((trip, idx) => {
			trip.busId = idx + 1
			updatedTrips.push(trip)
		})
	}
	dispatch(acceptBusScheduleLoad(updatedTrips))
}
