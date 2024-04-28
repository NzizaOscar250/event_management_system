import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
  numberOfTickets: {
    type: Number,
    required: true
  },
  
},{timestamps:true});

const BookingModel = mongoose.model('Booking', bookingSchema);


export default BookingModel