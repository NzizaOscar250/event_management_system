
import * as API from "../API"

export const signIn = (formData)=>async(dispatch)=>{

    try {
        const {data} =  await API.SignIn(formData)
        if(!data){
           const {response:{data,status}} = await API.SignIn(formData)
           if(status != 200) return {status:'ERROR',message:data.message}
        }
        dispatch({type:'AUTH',payload:data})
        return {status:"SUCCESS",message:'redirecting'}
    } catch (error) {
        const {response} = error
        console.log(response)
       
    }
}

export const signUp = (formData)=>async(dispatch)=>{
    try {
            const {data} =  await API.SignUp(formData)
         if(!data){
            const {response:{data,status}} = await API.SignUp(formData)
         
            if(status != 200) return {status:'ERROR',message:data.message}
         }
         dispatch({type:'AUTH',payload:data})
         return {status:"SUCCESS",message:'redirecting'}
         
        
    } catch (error) {
        console.log("working")
      
        console.log(error)
       
    }
}

export const createEvents = (info)=>async(dispatch)=>{
    try {
        const {data} = await API.createEvent(info)

        dispatch({type:'CREATE_EVENT',payload:data})

        return {
            status:'SUCCESS',message:'Event Created Successfully ',data
        }
        
    } catch (error) {
        return {status:'ERROR',message:error.message}
 
    }
}

export const updateEvent = (info)=>async(dispatch)=>{
    try {
        const {data} = await API.updateEvent(info)

        dispatch({type:'UPDATE_EVENT',payload:data})

        return {
            status:'SUCCESS',message:'Event updated Successfully ',data
        }
        
    } catch (error) {
        return {status:'ERROR',message:error.message}
 
    }
}

export const deleteEvent = (info)=>async(dispatch)=>{
    try {
        const {data} = await API.deleteEvent(info)

        dispatch({type:'DELETE_EVENT',payload:data})

        return {
            status:'SUCCESS',message:'Event Deleted Successfully ',data
        }
        
    } catch (error) {
        return {status:'ERROR',message:error.message}
 
    }
}

export const fetchEvents = ()=>async(dispatch)=>{

    try {
        const {data} = await API.fetchEvents()
        dispatch({type:'FETCH_EVENTS',payload:data})
        
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchBookings = ()=>async(dispatch)=>{

    try {
        const {data} = await API.fetchBookings()
        dispatch({type:'FETCH_BOOKINGS',payload:data})
    } catch (error) {
        console.log(error.message)
    }
}

export const removeBookings = (id)=>async(dispatch)=>{

    try {
        const {data} = await API.removeBookings(id)
        dispatch({type:'REMOVE_BOOKINGS',payload:data})
    } catch (error) {
        console.log(error.message)
    }
}
export const createBooking = (info)=>async(dispatch)=>{
    try {
        const {data} = await API.createBookings(info)

        dispatch({type:'CREATE_BOOKING',payload:data})

        return {
            status:'SUCCESS',message:'You have successfully booked this event',data
        }
        
    } catch (error) {
        return {status:'ERROR',message:error.message}
        // console.log(error.message)
    }
}