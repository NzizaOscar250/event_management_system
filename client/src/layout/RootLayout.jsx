import  { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navigations from "../components/Navigations"
import { useDispatch } from 'react-redux'
import {fetchBookings, fetchEvents} from "../actions"
import auth from '../helper/auth.helper'

const RootLayout = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(fetchEvents())
     if(auth.isAuthenticated()){
      dispatch(fetchBookings())
     }
  },[dispatch])


  return (
    <div>
        <Navigations/>
        <div>
            <Outlet/>
        </div>
        {/* <Footers/> */}
    </div>
  )
}

export default RootLayout