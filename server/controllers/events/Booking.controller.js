
import BookingModel from "../../models/Booking.model.js"
import EventModel from "../../models/Event.model.js"
import mongoose from "mongoose"




export const BookEvent = async(req,res)=>{
    try {
         const {tickets,eventId} = req.body
         const userId =  req.userId
         const remainingTickets = parseInt(req.Event.ticketTaken) + parseInt(tickets)

  
          if(!mongoose.isValidObjectId(eventId)) return res.status(404).json({message:'Invalid Event'})            
           const bookedBefore = await BookingModel.findOne({user:userId,event:eventId})
           if(bookedBefore) return res.status(400).json({message:'BookedBefore'})

          const result = await BookingModel.create({
            user:userId,
            event:eventId,
            numberOfTickets:tickets
          })

          if(!result) return res.status(404).json({message:'Could not create event Request'})
          const updateSpots = await EventModel.findByIdAndUpdate(eventId,{ticketTaken:remainingTickets})
          if(!updateSpots) return res.status(400).json({message:"Failed To update Remaining Tickets"})
           
          const findBookedEvent = await EventModel.findById(result.event)
          
          return res.json({...findBookedEvent.toObject(),bookingId:result._id})

    } catch (error) {
        return res.json({error:'Failed To book events',message:error.message})
    }
  }

export const CancelBooking = async(req,res)=>{
    try {
       
          const event = req.booking.event;//get event details
          const booking = req.booking; //booking details
          const ticketsTaken = event.ticketTaken // ticket taken by all users in general
          const mytickets = booking.numberOfTickets; // ticket taken by a user
          const eventId = req.booking.event._id; // event Id
           const remainingTickets = parseInt(ticketsTaken) - parseInt(mytickets); // remove my tickets
           
            const result = await BookingModel.findByIdAndDelete(booking._id)
          if(!result) return res.status(404).json({message:'Could Not Cancel event Request'})
         
          const updateSpots = await EventModel.findByIdAndUpdate(eventId,{ticketTaken:remainingTickets})
          if(!updateSpots) return res.status(400).json({message:"Failed To update Remaining Tickets"})
           return res.json(result)
        
    } catch (error) {
        return res.json({error:'Failed To Cancel booking event',message:error.message})
    }
  }

  export const fetchMybookings = async(req,res)=>{
    try {
         const user = req.userId
         const result = await BookingModel.find({user:user}).populate("event").exec()
         if(!result) return res.status(404).json({message:'No Bookings Yet'})
         

         const bookings = result.filter((booking)=>booking.event).map(booking => ({
          
          ...booking.event.toObject(), // Convert Mongoose document to plain JavaScript object
          bookingId: booking._id // Include the booking ID within the event object
      
  }));

         return res.json(bookings)
    } catch (error) {
        return res.json({error:'Your could not be found',e:error.message})
    }
}


export const getBookingById = async (req,res,next,id)=>{

  try {
          let book = await BookingModel.findById(id).populate("event").exec()


          if(!book) return res.status(403).json({error:'Booking Not Found'})
          req.booking = book

          next()

  } catch (error) {
      return res.status(400).json({error:error.message+" ,Couldn't return a booking "})        
  }
}



