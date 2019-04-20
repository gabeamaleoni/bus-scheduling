// bus-schedule/duck/actions.js
import * as types from './types'

const acceptBusScheduleLoad = json => ({
	type: types.ON_BUS_SCHEDULE_LOAD,
	payload: json
})
export const onBusScheduleLoad = trips => dispatch => {
	const updatedTripsArr = []
	const busArr = []
	const scheduleData = {}
	if (trips && trips.length) {
		trips.forEach((trip, idx) => {
			trip.busId = idx + 1
			updatedTripsArr.push(trip)
			busArr.push(trip.busId)
		})
	}
	scheduleData.updatedTripsArr = updatedTripsArr
	scheduleData.busArr = busArr
	dispatch(acceptBusScheduleLoad(scheduleData))
}
