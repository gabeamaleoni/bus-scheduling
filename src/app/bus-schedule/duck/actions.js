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
	const scheduleTimeInHours = []
	const totalScheduleTimeMin = 720 // 12 hours in min
	let startingMinute = 0
	while (startingMinute <= totalScheduleTimeMin) {
		startingMinute++

		if (startingMinute % 60 === 0) {
			scheduleTimeInHours.push({
				hour: startingMinute / 60,
				min: startingMinute
			})
			continue
		}
	}

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
	scheduleData.scheduleTimeInHours = scheduleTimeInHours
	dispatch(acceptBusScheduleLoad(scheduleData))
}

const handleExtraRoute = data => ({
	type: types.ON_ADD_EXTRA_ROUTE,
	payload: data
})
export const onTripSelect = data => (dispatch, getState) => {
	let newBusArr = getState().busSchedule.busArr
	let extraBusRoute = {
		trips: [],
		id: newBusArr.length + 1
	}
	dispatch({
		type: types.ON_TRIP_SELECT,
		payload: data
	})
	let currentSelectedTripId = getState().busSchedule.selectedTrip
		? getState().busSchedule.selectedTrip.id
		: null

	// create a new bus at the bottom of bus array
	if (currentSelectedTripId) {
		newBusArr.push(extraBusRoute)
	} else {
		newBusArr = newBusArr.filter(bus => {
			return bus.trips.length > 0
		})
	}
	dispatch(handleExtraRoute(newBusArr))
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
	const busArr = getState().busSchedule.busArr
	const currentBusRoute = getState().busSchedule.busOfSelectedTrip
	const targetBusRoute = busArr[targetBusIdx]
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
			busArr[currentBusRoute.idx] = currentBusRoute
		}

		// Append the trip into the target bus route
		targetBusRoute.trips.push(selectedTripObj)
		busArr[targetBusIdx] = targetBusRoute
		const newBusArr = busArr.filter(bus => {
			return bus.trips && bus.trips.length !== 0
		})

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
			(targetBusRouteTripsArr[i].startTime < selectedTripObj.startTime &&
				targetBusRouteTripsArr[i].endTime > selectedTripObj.startTime) ||
			(targetBusRouteTripsArr[i].startTime >= selectedTripObj.startTime &&
				targetBusRouteTripsArr[i].endTime <= selectedTripObj.endTime)
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
