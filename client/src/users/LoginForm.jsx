import React, { useState } from 'react';
import Input from "../components/Input"
import PasswordInput  from "../components/PasswordInput"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../actions';
import LoaderOverlay from '../components/LoaderOverlay';
const LoginForm = () => {
 
  const [formData,setFormData] = useState({username:'',email:'',password:''})
  const [error,setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
   
    dispatch(signIn(formData)).then((response)=>{
      const {message,status} = response
     
      setTimeout(()=>{
        setLoading(false)
        if(status == "ERROR"){
          setError(message)
        }
        if(status == 'SUCCESS'){
          navigate("/home")
        }
      },2000)
     
      
    })
  
  };

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value})

   

  }


  return (
   
    <div className='min-h-screen flex items-center'>
        <LoaderOverlay title="Processing..." loading={loading}/>
       <form onSubmit={handleSubmit} className="w-1/2 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
       <h1 className='font-bold text-center text-2xl pb-2 uppercase'>signin</h1>
       {
        error && <div className="bg-red-400 py-2 my-1 px-2 rounded">
          <p className="text-white font-bold">{error}</p>
      </div>
      }
       <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email Address
        </label>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <PasswordInput
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={ handleChange}
          required
        />
      </div>
      <div className="flex flex-col ">
       <p className='pb-2'>Don't have account? <Link to="/user/signup" className='text-indigo-400'>Signup</Link></p>
        
        <button
          className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
