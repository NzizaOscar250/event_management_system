import {combineReducers} from "redux"
import Auth from "./Auth"
import Events from "./Events"
import Bookings from "./Bookings"

export default combineReducers({
    auth:Auth,Events,Bookings
    
})