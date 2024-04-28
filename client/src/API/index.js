import axios from "axios"
import auth from "../helper/auth.helper"

const API = axios.create({
    baseURL:'http://localhost:7000/api/',
    headers:{
        "Content-Type":'application/json'
    }
})


API.interceptors.request.use((req)=>{
   if(auth.isAuthenticated()){
     req.headers.Authorization = 'Bearer '+ auth.isAuthenticated()?.token
        
   }
   
    return req
},(error)=>{console.log("there was ana ",error)})


API.interceptors.response.use((res)=>{
  
return res
},(error)=>{
    if(error?.response?.data?.redirect == "/auth"){
        auth.clearJWT()
        window.location.reload()
    }

  
        
    return error;
})


export const SignIn = (formData)=> API.post('/auth/signin',formData)
export const SignUp = (formData)=> API.post("/auth/signup",formData)
export const updateProfile = (formData)=>API.post(`/user/update/${formData.userId}`,formData)
export const fetchUser = (id)=>API.get(`/user/${id}`)



export const createEvent = (formData)=>API.post(`/events/${auth.userInfo()}`,formData)
export const updateEvent = (formData)=>API.put(`/events/${auth.userInfo()}/${formData.id}`,formData)
export const deleteEvent = (formData)=>API.delete(`/events/${auth.userInfo()}/${formData}`)



export const fetchEvents = ()=>API.get('/events/')
export const fetchBookings = ()=>API.get(`/booking/${auth.userInfo()}`)

export const removeBookings = (id)=>API.delete(`/booking/${auth.userInfo()}/${id}`)

export const createBookings = (data)=>API.post(`/booking/${auth.userInfo()}/${data.eventId}`,data)
