import { useEffect, useState } from 'react';
import Input from '../components/Input';
import LoaderOverlay from "../components/LoaderOverlay"
import {updateEvent} from "../actions/"
  import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const EditEvents = () => {
  const {eventId} = useParams()
  const events = useSelector((state)=>state.Events)
  const [eventData, setEventData] = useState({
    id:'',
    title:'',
    date:'',
    startTime:'',
    endTime:'',
    location:'',
    ticketAvailability:'',
    description:''
  });

const [loading,setLoading] = useState(false)
const [success,setSuccess] = useState('')
const [error,setError] = useState('')

const dispatch = useDispatch()

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
     
    dispatch(updateEvent(eventData)).then((response)=>{
        const {status,message} = response
        setTimeout(()=>{
          if(status == 'ERROR'){
            setError(message)
          }
          if(status == 'SUCCESS'){
            setSuccess(message)
            window.scrollTo({top:0,left:0,behavior:'smooth'})
          }
          setLoading(false)
        },1000)
    })

   
  };

useEffect(()=>{
      const findEvent = events.find((eve)=>eve._id === eventId)
      const d = moment(findEvent.date).format('yyyy-MM-DD')
      setEventData({...findEvent,date:d,id:findEvent._id})
},[eventId,events])




  return (
    <div className="max-w-5xl mx-auto mt-8">
    <LoaderOverlay loading={loading} title="Processing....."/>
      <h2 className="text-2xl font-semibold mb-4 text-purple-500">EDIT EVENT</h2>
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
            
            name="title"
            value={eventData.title}
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
            name="date"
            value={eventData.date}
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
           
            name="ticketAvailability"
            value={eventData.ticketAvailability}
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
       {/* could not find the time to update highlights */}
       {/* <Highlight onHighlightsChange={handleHighlightsChange} /> */}
       </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvents;
