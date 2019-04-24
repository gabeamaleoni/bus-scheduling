// bus-schedule/duck/reducers.js
import * as types from './types'

const defaultState = {
	isFetching: false,
	tripsArr: [],
	busArr: [],
	errors: [],
	selectedTrip: null,
	shouldShowEmptyRoute: false
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case types.ON_BUS_SCHEDULE_LOAD:
			return {
				...state,
				tripsArr: action.payload.updatedTripsArr,
				busArr: action.payload.busArr,
				scheduleTimeInHours: action.payload.scheduleTimeInHours
			}

		case types.ON_TRIP_SELECT:
			let selectedTrip
			const busOfSelectedTrip = state.busArr[action.payload.busIdx]

			if (
				// if user clicks currently selected trip
				state.selectedTrip &&
				action.payload.id === state.selectedTrip.id
			) {
				selectedTrip = null
			} else {
				selectedTrip = action.payload
			}

			busOfSelectedTrip.idx = action.payload.busIdx
			return {
				...state,
				selectedTrip: selectedTrip,
				busOfSelectedTrip: busOfSelectedTrip,
				errors: []
			}

		case types.ON_ADD_EXTRA_ROUTE:
			return {
				...state,
				busArr: action.payload
			}

		case types.ACCEPT_ASSIGN_TRIP:
			return {
				...state,
				busArr: action.payload.busArr,
				selectedTrip: null,
				errors: []
			}

		case types.REJECT_ASSIGN_TRIP:
			const error =
				'A bus can only do one trip at a time. Try a different time slot.'
			const updatedErrors = state.errors
			updatedErrors.push(error)
			return {
				...state,
				selectedTrip: null,
				busArr: action.payload,
				errors: updatedErrors
			}

		default:
			return state
	}
}
