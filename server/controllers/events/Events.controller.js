import mongoose from "mongoose"
import EventModel from "../../models/Event.model.js"


export const createEvent = async(req,res)=>{
    try {
         const {name,startDate,startTime,endTime,location,ticketAvailable,highlights,description} = req.body 
         const creator = req.profile._id
        
         if(!mongoose.isValidObjectId(creator)) return res.status(404).json({error:'Invalid Login'})

         const newCourse = await EventModel.create({
            title: name,
            date: startDate,
            startTime: startTime,
            endTime:endTime,
            location: location,
            ticketAvailability: ticketAvailable,
            description: description,
            highlights: [...highlights],
            createdBy:creator
          })

         return res.json(newCourse)

    } catch (error) {
        return res.status(403).json({error:error.message})
    }
}




export const getEventByUser = async (req,res)=>{
    try {
        const userId = req.profile._id

        if(!mongoose.isValidObjectId(userId)) return res.status(403).json({error: "Invalid creator"})
        const result = await EventModel.find({instructor:userId}).populate('instructor','_id firstname lastname username')

        return res.json(result)


    } catch (error) {
        return res.status(403).json({error:error.message})
    }
}

export const  Event = async(req,res)=>{
        try {
          req.Event.image = undefined
          res.json(req.Event)
            
        } catch (error) {
            return res.status(403).json({error:error.message})
        }
}




export const updateEvent = async(req,res)=>{
    try {
     
        const eventId = req.Event._id
         if(!mongoose.isValidObjectId(eventId)) return res.status(404).json({error:'Invalid Event'})

       const result = await EventModel.findByIdAndUpdate(req.Event._id,{
            ...req.body,
            updatedAt:Date.now
        })
        const updated = await EventModel.findById(result._id)

         return res.json(updated)
    
        } catch (error) {
        return res.status(400).json({error})
    }
}


export const removeEvent = async(req,res)=>{
    try {
         const Event = req.Event._id

         const result = await EventModel.findByIdAndDelete(Event)
         return res.json(result)

    } catch (error) {
        return res.json({error:'could not be removed'})
    }
}



export const deleteEvents = async(req,res)=>{
    try {
         const Event = req.Event._id

         const result = await EventModel.findByIdAndDelete(Event)
         return res.json(result)
    } catch (error) {
        return res.json({error:'could not be removed'})
    }
}

export const getEvents = async(req,res)=>{
    try {
         
         const result = await EventModel.find().populate({path:"createdBy",select:"username profile"}).exec()
         return res.json(result)
    } catch (error) {
        return res.json({error:'Events could not be found'})
    }
}


export const getEventWithBookings = async (req, res) => {
  try {
      const eventId = req.params.eventId;

      if (!mongoose.isValidObjectId(eventId)) return res.status(404).json({ message: 'Invalid Event' });

      // Retrieve the event with populated bookings
      const event = await EventModel.findById(eventId).populate('bookings');

      if (!event) return res.status(404).json({ message: 'Event not found' });

      return res.json(event);
  } catch (error) {
      return res.status(500).json({ error: 'An error occurred' });
  }
};










export const EventById = async (req,res,next,id)=>{

    try {
            let Event = await EventModel.findById(id).populate('createdBy','_id  username profile')

            if(!Event) return res.status(403).json({error:'Event Not Found'})
            req.Event = Event

            next()

    } catch (error) {
        return res.status(400).json({error:error.message+" ,Couldn't return a Event "})        
    }
}

