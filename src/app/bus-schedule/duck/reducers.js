// bus-schedule/duck/reducers.js
import * as types from './types'

const initialState = {
	isFetching: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case types.ON_BUS_SCHEDULE_LOAD:
			return {
				...state,
				busSchedulingArr: action.payload
			}
		default:
			return state
	}
}
