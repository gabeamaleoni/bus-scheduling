// bus-schedule/duck/reducers.js
import * as types from './types'

const initialState = {
	isFetching: false,
	tripsArr: [],
	busArr: [],
	selectedTrip: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case types.ON_BUS_SCHEDULE_LOAD:
			return {
				...state,
				tripsArr: action.payload.updatedTripsArr,
				busArr: action.payload.busArr
			}
		case types.ON_TRIP_SELECT:
			let selectedTrip
			if (state.selectedTrip && action.payload.id === state.selectedTrip.id) {
				selectedTrip = null
			} else {
				selectedTrip = action.payload
			}
			return {
				...state,
				selectedTrip: selectedTrip
			}
		default:
			return state
	}
}
