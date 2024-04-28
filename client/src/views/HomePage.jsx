import React, { useEffect, useState } from 'react'
import Event from '../components/Event'

import getRandomImage from '../components/getRandomImage'
import { useSelector } from 'react-redux'

const HomePage = () => {
  
  const Events = useSelector((state)=>state.Events)
  const [events,setEvents] = useState([])
  const bgimage = getRandomImage()
  useEffect(()=>{
  setEvents(Events)
  },[Events])
  return (
   <div className='container mx-auto py-2'>
      
        <h1 className='text-gray-700 font-bold text-2xl py-2'>Ongoing Events</h1>
       <div className='grid grid-cols-1 sm:grid-cols-3  gap-4'>
        {
          events.map((k,i)=>(
            <React.Fragment key={i}>
            <Event  
        backgroundImage={bgimage} 
        title={k.title} 
        creatorUsername={k.createdBy.username}
        startDate={k.date}
        startTime={k.startTime}
        endTime={k.endTime}
        takenSpot={k.ticketTaken}
        availableSpot={k.ticketAvailability} 
        location={k.location}
        id={k._id}         />
            </React.Fragment>
          ))
        }
       </div>

       
   </div>
  )
}

export default HomePage