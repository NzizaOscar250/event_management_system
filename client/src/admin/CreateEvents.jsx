import React, { useState } from 'react';
import Input from '../components/Input';
import Highlight from './Highlight';
import LoaderOverlay from "../components/LoaderOverlay"
import {createEvents} from "../actions/"
  import { useDispatch } from 'react-redux';
const CreateEvents = () => {
  const [eventData, setEventData] = useState({
    name:'',
    startDate:'',
    startTime:'',
    endTime:'',
    location:'',
    ticketAvailable:'',
    highlights:[],
    description:''
  });

const [loading,setLoading] = useState(false)
const [success,setSuccess] = useState('')
const [error,setError] = useState('')

const dispatch = useDispatch()

  const handleHighlightsChange = (highlights) => {
    // setHighlightsData(highlights);
    setEventData({...eventData,highlights:highlights})
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
     
    dispatch(createEvents(eventData)).then((response)=>{
        const {status,message} = response
        setTimeout(()=>{
          if(status == 'ERROR'){
            setError(message)
          }
          if(status == 'SUCCESS'){
            setSuccess(message)
            window.scrollTo({top:0,left:0,behavior:'smooth'})
            setEventData({
              name:'',
              startDate:'',
              startTime:'',
              endTime:'',
              location:'',
              ticketAvailable:'',
              highlights:[],
              description:''
            })
          }
          setLoading(false)
        },1000)
    })

   
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
    <LoaderOverlay loading={loading} title="Processing....."/>
      <h2 className="text-2xl font-semibold mb-4 text-purple-500">CREATE EVENT</h2>
      <p className={`p-2 my-2 rounded capitalize ${success && 'bg-green-500'} ${error && 'bg-red-500'}  text-white font-bold`}>
          {success} {error}
      </p>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
       <div className='block sm:grid grid-cols-3 gap-2'>
       <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
            Event Name
          </label>
          <Input
            type="text"
            placeholder="Event Name"
            
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <Input
            type="date"
            id="date"
            name="startDate"
            value={eventData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
            Start Time
          </label>
          <Input
            type="time"
            id="startTime"
            name="startTime"
            value={eventData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
            End Time
          </label>
          <Input
            type="time"
            id="endTime"
            name="endTime"
            value={eventData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <Input
            type="text"
            placeholder="Location"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketAvailability">
            Ticket Availability
          </label>
          <Input
            type="number"
            placeholder="Ticket Availability"
           
            name="ticketAvailable"
            value={eventData.ticketAvailable}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 col-span-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="resize-none border rounded-md w-full p-2"
            rows="4"
          ></textarea>
        </div>
        
       </div>
       <div className='col-span-3'>
       <Highlight onHighlightsChange={handleHighlightsChange} />
       </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvents;
