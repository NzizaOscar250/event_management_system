import express from "express"
import {userById } from "../controllers/user.controllers.js"
import {EventById, createEvent, getEventByUser,updateEvent,removeEvent,getEvents} from "../controllers/events/Events.controller.js"
import { isAuthorized } from "../middleware/Auth.js";
import { isAdmin } from "../middleware/rest.mid.js";


const eventsRoutes = express.Router();



eventsRoutes.post('/:userId',isAuthorized,isAdmin,createEvent)
            .get('/',getEvents)
            .delete("/:userId/:eventId",isAuthorized,isAdmin,removeEvent)
            .put("/:userId/:eventId",isAuthorized,isAdmin,updateEvent)
            

    



eventsRoutes.param('userId',userById)
eventsRoutes.param('eventId',EventById)
export default eventsRoutes;