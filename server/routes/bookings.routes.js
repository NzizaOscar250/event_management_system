import express from "express"
import {userById } from "../controllers/user.controllers.js"
import {EventById} from "../controllers/events/Events.controller.js"
import { BookEvent, CancelBooking, fetchMybookings,getBookingById } from "../controllers/events/Booking.controller.js";
import { isAuthorized } from "../middleware/Auth.js";
import { isAdmin } from "../middleware/rest.mid.js";


const bookingRoutes = express.Router();



bookingRoutes.post("/:userId/:eventId",isAuthorized,BookEvent)
             .get("/:userId",isAuthorized,fetchMybookings)
             .delete("/:userId/:bookingId",isAuthorized,CancelBooking)





bookingRoutes.param('userId',userById)
bookingRoutes.param('eventId',EventById)
bookingRoutes.param('bookingId',getBookingById)
export default bookingRoutes;