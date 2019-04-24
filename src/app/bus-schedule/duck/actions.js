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

const handleProvisionalBus = data => ({
	type: types.ON_ADD_PROVISIONAL_BUS,
	payload: data
})

const removeProvisionalBus = busArr => {
	return busArr.filter(bus => {
		return bus.trips.length > 0
	})
}

export const onTripSelect = data => (dispatch, getState) => {
	let newBusArr = getState().busSchedule.busArr
	let provisionalBus = {
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
		newBusArr.push(provisionalBus)
	} else {
		newBusArr = removeProvisionalBus(newBusArr)
	}
	dispatch(handleProvisionalBus(newBusArr))
}

const acceptAssignTrip = data => ({
	type: types.ACCEPT_ASSIGN_TRIP,
	payload: data
})
const rejectAssignTrip = newBusArr => ({
	type: types.REJECT_ASSIGN_TRIP,
	payload: newBusArr
})

export const onAssignTrip = targetBusIdx => (dispatch, getState) => {
	const tripsArr = getState().busSchedule.tripsArr
	const busArr = getState().busSchedule.busArr
	const currentBus = getState().busSchedule.busOfSelectedTrip
	const targetBus = busArr[targetBusIdx]
	let selectedTripObj = {}
	const selectedTripId = getState().busSchedule.selectedTrip
		? getState().busSchedule.selectedTrip.id
		: ''

	// Get the trip that will be assigned to target bus from the total trips array
	for (let i = 0; i < tripsArr.length; i++) {
		if (tripsArr[i].id === selectedTripId) {
			selectedTripObj = tripsArr[i]
			break
		}
	}

	// Check if the trips conflict
	const tripsConflict = checkIfTripsConflict(targetBus, selectedTripObj)

	if (tripsConflict) {
		const newBusArr = removeProvisionalBus(busArr)
		dispatch(rejectAssignTrip(newBusArr))
	} else {
		// Remove the trip from it's current bus
		if (selectedTripId) {
			currentBus.trips = currentBus.trips.filter(trip => {
				return trip.id !== selectedTripId
			})
			busArr[currentBus.idx] = currentBus
		}

		// Append the trip into the target bus
		targetBus.trips.push(selectedTripObj)
		busArr[targetBusIdx] = targetBus
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

const checkIfTripsConflict = (targetBus, selectedTripObj) => {
	let tripsConflict = false

	if (targetBus.id === selectedTripObj.busId) {
		// If we are trying to assign trip to the bus it's already assigned to
		return tripsConflict
	}
	const targetBusTripsArr = targetBus.trips

	for (var i = 0; i < targetBusTripsArr.length; i++) {
		if (
			(targetBusTripsArr[i].startTime < selectedTripObj.startTime &&
				targetBusTripsArr[i].endTime > selectedTripObj.startTime) ||
			(targetBusTripsArr[i].startTime >= selectedTripObj.startTime &&
				targetBusTripsArr[i].endTime <= selectedTripObj.endTime)
		) {
			tripsConflict = true
			break
		}

		if (
			targetBusTripsArr[i].startTime < selectedTripObj.endTime &&
			targetBusTripsArr[i].endTime > selectedTripObj.endTime
		) {
			tripsConflict = true
			break
		}
	}
	return tripsConflict
}
