import {combineReducers} from 'redux'
import interviewReducer from './interview/interviewReducer'

const rootReducer = combineReducers({
    interview: interviewReducer
})

export default rootReducer