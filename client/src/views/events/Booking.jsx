import React, { useState } from 'react';
import LoaderOverlay from '../../components/LoaderOverlay';
import { useDispatch } from 'react-redux';
import {createBooking } from "../../actions" 

const Booking = ({ maxTickets, eventId }) => {
  const [numTickets, setNumTickets] = useState(1);
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
const [error,setError] = useState('')
const [success,setSuccess] = useState('')
  const handleChange =(e)=>{
    const {value} = e.target
    console.log(value)
    if (value > maxTickets) {
      setError("Excess Tickets: Can not exceed value less than or equal to " + maxTickets + " Tickets");
      setNumTickets(maxTickets)
    } else {
      setError("");
      setNumTickets(value)
    }
  
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    setLoading(true)
    const data = {tickets:numTickets,eventId:eventId}
    console.log("submiteed")
    dispatch(createBooking(data)).then((response)=>{
      const {status,message}= response

      setTimeout(()=>{
        if(status == 'SUCCESS'){
            setSuccess(message)
        }
        else{
          setError(message)
        }
        setLoading(false)
      },1500)
    })

  }
 

return (
  <form onSubmit={handleSubmit}>
    <div className="bg-white rounded-lg shadow-md p-4">
  <LoaderOverlay loading={loading} title="Booking...."/>
  <h2 className="text-xl font-bold mb-4">Book Tickets</h2>
  {
    error && <p className='bg-red-700 text-white py-2 px-2 rounded my-2 font-bold'>{error}</p>
  }
  {
    success && <p className='bg-green-700 text-white py-2 px-2 rounded my-2 font-bold'>{success}</p>
  }
  <div className="flex items-center mb-4">
    <label className="mr-2">Number of Tickets:</label>
    <input
      type="number"
      min="0"
      max={maxTickets}
      value={numTickets}
      onChange={handleChange}
      className="w-20 px-2 py-1 border rounded focus:outline-none"
    />
  </div>
  
  {numTickets > 0 && (
    <button
      
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    >
      Book
    </button>
  )}
</div>
  </form>
)
};

export default Booking;
