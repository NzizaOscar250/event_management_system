import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String, 
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  ticketAvailability: {
    type: Number,
    required: true
  },
  ticketTaken:{
    type: Number,
    default:0
  },
  description:{
    type:String
  },
  highlights: [
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    },
    
  ],
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:true
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
}]
},{timestamps:true});

const EventModel = mongoose.model('Event', eventSchema);

export default EventModel
