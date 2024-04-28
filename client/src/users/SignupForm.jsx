import Input from "../components/Input"
import PasswordInput  from "../components/PasswordInput"
import {Link,  Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { signUp } from "../actions";
import {useDispatch} from "react-redux"
import LoaderOverlay from "../components/LoaderOverlay"
const SignupForm = () => {
  const [formData,setFormData] = useState({username:'',email:'',password:''})
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    dispatch(signUp(formData)).then((response)=>{
      const {message,status} = response
      setLoading(false)
      if(status == "ERROR"){
        setError(message)
      }
      if(status == 'SUCCESS'){
        navigate("/home")
      }
      
    })
  
  };

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value})

   

  }

  
  

  return (
    
    <div className="min-h-screen flex items-center">
    <LoaderOverlay loading={loading} title="Processing..."/>
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="font-bold text-lg">SIGNUP</h2>
    <p className="py-2">Signup to continue to our application</p>

      {
        error && <div className="bg-red-400 py-2 my-1 px-2 rounded">
          <p className="text-white font-bold">{error}</p>
      </div>
      }

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Username
        </label>
        <Input
          type="text"
          placeholder="Enter Username..."
          value={formData.username}
          name="username"
       
          onChange={handleChange}
          required
        />
      </div>

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
      <div className="flex flex-col gap-1 ">
      <p className='pb-2'>Already have account? 
      <Link to="/user/signin" replace className='text-indigo-400' name="signin">Signin</Link></p>
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>

    </div>
  );
};

export default SignupForm;
