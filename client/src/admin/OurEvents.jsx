import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import creator from "../assets/avatars/avatar_15.jpg"
import moment from "moment"
import getRandomImage from '../components/getRandomImage';
import { useDispatch, useSelector } from 'react-redux';
import {deleteEvent} from "../actions/"
const OurEvents = () => {
     const bookings = useSelector((state)=>state.Events)
     const [bookedEvents,setBookedEvents] = useState([])
     const dispatch = useDispatch()



    const backgroundImage = getRandomImage()


    const handleRemove =(id)=>{
      
        dispatch(deleteEvent(id)).then((response)=>{
          const {status,message} = response
            if(status == 'ERROR'){
              alert("ERROR: ",message)
            }else{
              alert(message)
              
            }
            
        })
    }

    useEffect(()=>{
           setBookedEvents(bookings)
           console.log(bookings)
    },[bookings])

   
    return (

    <div className=' mx-auto'>
       <header className=' px-2 py-3 '>
           <h4 className='font-bold text-purple-700 text-2xl'>DASHBOARD</h4>
       </header>
       <header className='p-2'>
           <h4 className='font-bold text-gray-700'>EVENTS</h4>
       </header>


       <div className='container mx-auto grid grid-cols-3 gap-4'>

           {
            bookedEvents.length ==0  ?<h3 className='font-bold bg-white p-2 rounded my-2 col-span-3'>No Events Booked Yet</h3> : bookedEvents.map((event)=>(
                <React.Fragment key={event._id}>
           
        <div className="relative bg-gray-50 rounded-lg  shadow-md overflow-hidden">
      
      <div
        className="top-0 left-0 w-full  bg-cover  bg-center h-28 "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      <div className='  h-full py-2 px-2  '>
      <p className='flex text-xs items-center bg-gray-800 py-2 px-1 rounded  gap-1 '>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
          <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
        </svg>

      </span>
      <span className='text-white font-bold '>{event.location}</span>
      </p>
      </div>
            
      </div>

      
      <div className="relative z-10 flex gap-2">
       
        <div className="w-20 px-2">
          <div
            className="absolute rounded-full -top-3 h-16 w-16 bg-cover bg-white"
            style={{ backgroundImage: `url(${creator})` }}
          ></div>
        </div>

        
        <div className="px-3">
          <h2 className="text-md font-bold pt-2">{event.title}</h2>
        
          <div className="text-xs">
            <p className='flex gap-1 font-bold'><span  className="text-blue-500">{event.ticketAvailability}</span> Available Spots </p>
          </div>
        </div>
        
      </div>
            
        <div className='flex gap-2 items-center justify-center'>
        
                    <p className="text-gray-700  p-2 flex gap-1 items-center text-xs"> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>


                    {moment(event.startDate).format('DD MMMM YYYY')}, {event.startTime} - {event.endTime}</p>
        </div>
        <div className='flex gap-1 p-1'>
            <button onClick={()=>handleRemove(event._id)}  className="bg-red-500 hover:bg-red-600 font-bold text-white
             p-2 rounded w-full ">DELETE</button>

            <Link to={`events/${event._id}`} className="bg-purple-500 hover:bg-purple-700 font-bold text-white p-2 rounded w-full text-center">View </Link>
        </div>
          
    </div>
    
                </React.Fragment>
            ))
           }
       </div>

    </div>
  );
};

export default OurEvents;
