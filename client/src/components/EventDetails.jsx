import React from 'react';
import { Link } from 'react-router-dom';

const EventDetails = ({ backgroundImage, creatorImage, title, creatorUsername, startDate, startTime, 
  endTime, takenSpot, availableSpot,
  description ,highlights,location}) => {
    const truncatedTitle = title;
 console.log(highlights)
    return (
    
        <div className="relative rounded-lg  overflow-hidden">
      
      <div
        className="top-0 left-0 w-full  bg-cover  bg-center h-[10rem] "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      
            
      </div>

      
      <div className="relative z-5 flex gap-2">
        <div className="w-20 px-2">
          <div
            className="absolute rounded-full -top-3 h-16 w-16 bg-cover bg-white"
            style={{ backgroundImage: `url(${creatorImage})` }}
          ></div>
        </div>

        
        <div className='flex flex-1  justify-between '>
            <div className="px-3">
              <header className='flex justify-between'>
              <div>
                  <h2 className="text-xl font-bold ">{truncatedTitle}</h2>
                  <p className="text-gray-700 text-xs ">@{creatorUsername}</p>
                  
              </div>
              
              </header>
            
                <div className='flex-1 py-2'>
                      <h4 className='py-2 font-bold'>Description</h4>

                    <p className='text-sm'>
                    
                    {
                      description
                    }
                    </p>
                    
                    <div className=" py-2">
                    <p className='flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                      <span className='font-bold'>Location: </span>{location}
                    </p>
                    
                   <p className="text-gray-900   flex gap-1 items-center"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                     

                        <span className='flex-1'><span className="font-bold">Date: </span> {startDate}, {startTime} - {endTime}</span>
                    </p>

                    <p className='flex gap-1 text-sm font-bold'> 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                      </svg>
                      <span className='font-bold'>Available Seats: </span>

                          <span className='text-indigo-600 font-bold'>{availableSpot - takenSpot}</span> 
                      
                          
                      </p>
              </div>

                    <div className="hightlights">
        <h2 className="text-md font-bold mb-4">Event Highlights:</h2>
        <ul className="list-decimal list-inside list-v text-sm">
            {
              highlights && highlights.map((h)=>(
                <React.Fragment key={h._id}>
                <li className="mb-2"><span className='font-bold'>{h.name}: </span>{h.description}</li>
            
                </React.Fragment>
              ))
            }
        
        </ul>
    </div>
                </div>

            </div>
           
            
           
          </div>
          
      </div>
            
        
          
        </div>
    
  );
};

export default EventDetails;
