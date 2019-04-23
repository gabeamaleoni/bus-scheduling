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
				busArr: action.payload.busArr
			}

		case types.ACCEPT_TRIP_SELECT:
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
				busOfSelectedTrip: busOfSelectedTrip
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
				errors: updatedErrors
			}

		default:
			return state
	}
}
