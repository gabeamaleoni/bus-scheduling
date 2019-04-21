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
			busArr.push({
				trips: [trip],
				id: idx + 1
			})
		})
	}

	// busArr.forEach((bus, idx) => {
	// 	bus.trips = []
	// })

	scheduleData.updatedTripsArr = updatedTripsArr
	scheduleData.busArr = busArr
	dispatch(acceptBusScheduleLoad(scheduleData))
}

export const onTripSelect = id => ({
	type: types.ON_TRIP_SELECT,
	payload: id
})
export const onBusSelect = busIdx => (dispatch, getState) => {
	let tripsArr = getState().busSchedule.tripsArr
	let busArr = getState().busSchedule.busArr
	let selectedTripObj = {}
	let selectedTripId = getState().busSchedule.selectedTrip
		? getState().busSchedule.selectedTrip.id
		: ''

	for (let i = 0; i < tripsArr.length; i++) {
		if (tripsArr[i].id === selectedTripId) {
			selectedTripObj = tripsArr[i]
		}
	}

	let busToUpdate = busArr[busIdx]
	busToUpdate.trips.push(selectedTripObj)
	busToUpdate.busIdx = busIdx
	dispatch({
		type: types.ON_BUS_SELECT,
		payload: busToUpdate
	})
}
