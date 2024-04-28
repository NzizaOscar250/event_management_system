// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { useDispatch } from 'react-redux';
import {fetchEvents} from "../actions"
const Dashboard = () => {
  const[open,setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchEvents())
  },[dispatch])



const handleClose= ()=>{
setOpen((prev)=>!prev)
}
  return (
    <div className="mx-auto ">
    <Sidebar isOpen={open} onClose={handleClose} title="DASHBOARD"/>
      
      <div className={`${open && 'ml-[16rem] w-r'} `}>
       <TopBar handleClose={handleClose}/>
    
     <div className='container bg-white  min-h-screen mx-auto p-4'>
       <Outlet/>
     </div>
      </div>
    </div>
  );
};

export default Dashboard;
