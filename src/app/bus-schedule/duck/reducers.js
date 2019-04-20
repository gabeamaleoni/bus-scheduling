// bus-schedule/duck/reducers.js
import * as types from './types'

const initialState = {
	isFetching: false,
	tripsArr: [],
	busArr: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case types.ON_BUS_SCHEDULE_LOAD:
			return {
				...state,
				tripsArr: action.payload.updatedTripsArr,
				busArr: action.payload.busArr
			}
		default:
			return state
	}
}
