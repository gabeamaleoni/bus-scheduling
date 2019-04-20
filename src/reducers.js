import { combineReducers } from 'redux'
import busScheduleReducer from './app/bus-schedule/duck/reducers'

const rootReducer = combineReducers({
	busSchedule: busScheduleReducer
})

export default rootReducer
