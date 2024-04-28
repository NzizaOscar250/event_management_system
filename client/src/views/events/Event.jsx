import React, { useEffect, useState } from 'react';
import EventDetails from '../../components/EventDetails'; // Assuming you have the EventDetails component in a separate file

import creator from "../../assets/avatars/avatar_15.jpg"
import Booking from './Booking';
import { Link, useNavigate, useParams } from 'react-router-dom';

import getRandomImage from '../../components/getRandomImage';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import auth from '../../helper/auth.helper';
import { deleteEvent } from '../../actions';


const data = {
backgroundImage:getRandomImage(),
creatorImage:creator,
title:'Graphic Design Training',
creatorUsername:'@nziza oscar',
startDate:'10 August 2024',
startTime:'11:00AM',
endTime:'03:45PM',
takenSpot:'14',
availableSpot:'140',
}
const Event = () => {
 
  const [booking,setBooking] = useState(false)
  const {eventId} = useParams()
  const [booked,setBooked] = useState(false)
  const Events = useSelector((state)=>state.Events).find((ev)=>ev._id == eventId)
  const Bookings = useSelector((state)=>state.Bookings)
  const navigate = useNavigate()
  const [bookingError,setBookingError] = useState('')
  const dispatch = useDispatch()
 

  const [events,setEvents] = useState({})
const backgroundImage = getRandomImage()
  useEffect (()=>{
   setEvents(Events)
   

  },[Events])
  
  useEffect(()=>{
    const isBooked = Bookings.find((event)=>event._id == eventId)
    if(isBooked){
      setBooked(true)
    }
   
  },[eventId,Bookings])
  const handleBookClick = () => {
   
    
    if(booked){
      setBookingError("You have already booked this event")
    }else{
      setBooking((prev)=>!prev)
    }
  };

  const handleBook = (numTickets) => {
  
    console.log(`Booking ${numTickets} tickets...`);
  };

  const handleBookDelete = (id)=>{
    dispatch(deleteEvent(id)).then((response)=>{
      const {status,message} = response
        if(status == 'ERROR'){
          alert("ERROR: ",message)
        }else{
          alert(message)
          navigate("/admin/dashboard")
        }
        
    })
  }
 
  return (
    <div className="bg-white rounded-lg  p-4">
    { bookingError && <p className='bg-red-500 text-white p-2 rounded font-bold'>{bookingError}</p>}
    {
        booking && <Booking maxTickets={events?.ticketAvailability} onBook={handleBook} eventId={events?._id}/>
    }
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-bold">{events?.title}</h2>
       <div className='flex gap-2'>
     {
        
     !auth.isAuthenticated() ?  <Link to="/user/signin"
          className={`${booking?'bg-red-500':'bg-blue-500'} hover:${booking?'bg-red-700':'bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none `}
          onClick={handleBookClick}
        >
           Book
        </Link>:
          <React.Fragment>
            {
              !auth.isAdmin() && <button
                                    className={`${booking?'bg-red-500':'bg-blue-500'} hover:${booking?'bg-red-700':'bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none `}
                                    onClick={handleBookClick}
                                  >
                                  {booking?"Cancel":"Book"}
                                </button>
            }
          </React.Fragment>
     }
       {
        auth.isAdmin() && (
          <React.Fragment>
              <Link to="/admin/dashboard/bookings/eventId"
              className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              onClick={handleBookClick}
            >
              Bookings
            </Link>
            <Link 
              to="edit"
              className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              onClick={handleBookClick}
            >
              Edit
            </Link>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              onClick={()=>handleBookDelete(events._id)}
            >
              Delete
            </button>
          </React.Fragment>
        )
       }
       </div>
      </div>
      <EventDetails
      
       backgroundImage={backgroundImage} 
        creatorImage={creator} 
        title={events?.title} 
        creatorUsername={events?.createdBy?.username}
        startDate={moment(events?.startDate).format("DD MMMM YYYY")}
        startTime={events?.startTime}
        endTime={events?.endTime}
        takenSpot={events?.ticketTaken}
        availableSpot={events?.ticketAvailability}
        highlights= {events?.highlights}
        description={events?.description} 
        location={events?.location}
      />
    </div>
  );
};

export default Event;
