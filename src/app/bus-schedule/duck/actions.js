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

	scheduleData.updatedTripsArr = updatedTripsArr
	scheduleData.busArr = busArr
	dispatch(acceptBusScheduleLoad(scheduleData))
}

const acceptTripSelect = data => ({
	type: types.ACCEPT_TRIP_SELECT,
	payload: data
})
export const onTripSelect = data => dispatch => {
	dispatch(acceptTripSelect(data))
}

const acceptAssignTrip = data => ({
	type: types.ACCEPT_ASSIGN_TRIP,
	payload: data
})
const rejectAssignTrip = () => ({
	type: types.REJECT_ASSIGN_TRIP
})
export const onAssignTrip = targetBusIdx => (dispatch, getState) => {
	const tripsArr = getState().busSchedule.tripsArr
	const newBusArr = getState().busSchedule.busArr
	const currentBusRoute = getState().busSchedule.busOfSelectedTrip
	const targetBusRoute = newBusArr[targetBusIdx]
	let selectedTripObj = {}
	const selectedTripId = getState().busSchedule.selectedTrip
		? getState().busSchedule.selectedTrip.id
		: ''

	// Get the trip that will be assigned to target bus route from the total trips array
	for (let i = 0; i < tripsArr.length; i++) {
		if (tripsArr[i].id === selectedTripId) {
			selectedTripObj = tripsArr[i]
			break
		}
	}

	// Check if the trips conflict
	const tripsConflict = checkIfTripsConflict(targetBusRoute, selectedTripObj)

	if (tripsConflict) {
		dispatch(rejectAssignTrip())
	} else {
		// Remove the trip from it's current bus route
		if (selectedTripId) {
			currentBusRoute.trips = currentBusRoute.trips.filter(trip => {
				return trip.id !== selectedTripId
			})
			newBusArr[currentBusRoute.idx] = currentBusRoute
		}

		// Append the trip into the target bus route
		targetBusRoute.trips.push(selectedTripObj)
		newBusArr[targetBusIdx] = targetBusRoute
		dispatch(
			acceptAssignTrip({
				busArr: newBusArr,
				targetBusIdx: targetBusIdx,
				selectedTripObj: selectedTripObj
			})
		)
	}
}

const checkIfTripsConflict = (targetBusRoute, selectedTripObj) => {
	let tripsConflict = false
	if (!targetBusRoute) {
		return tripsConflict
	}
	const targetBusRouteTripsArr = targetBusRoute.trips

	for (var i = 0; i < targetBusRouteTripsArr.length; i++) {
		if (
			targetBusRouteTripsArr[i].startTime < selectedTripObj.startTime &&
			targetBusRouteTripsArr[i].endTime > selectedTripObj.startTime
		) {
			tripsConflict = true
			break
		}

		if (
			targetBusRouteTripsArr[i].startTime < selectedTripObj.endTime &&
			targetBusRouteTripsArr[i].endTime > selectedTripObj.endTime
		) {
			tripsConflict = true
			break
		}
	}
	return tripsConflict
}
