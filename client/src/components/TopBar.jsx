import  { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from "../assets/avatars/avatar_1.jpg"
import auth from '../helper/auth.helper';
const TopBar = ({handleClose}) => {
 

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout logic


    auth.clearJWT()
  };
const {username} = auth.userDetails()

console.log(username)


  return (
    <div className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      {/* Logo or site name */}
      <div className="text-lg font-bold ">
            <button onClick={()=>handleClose()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
            </button>

      </div>

      <div className="relative z-50">
        
        <button onClick={handleToggleDropdown} className="flex items-center space-x-2">
          <img src={profile} alt="Profile" className="w-8 h-8 rounded-full" />
          <span className='capitalize'>{username}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4 10a6 6 0 1112 0 6 6 0 01-12 0zm6-4a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
          </svg>
        </button>

      
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-1 z-50">
            {/* <Link to="/admin/dashboard/profile" className="flex gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
                </svg>
              </span>
              Profile
            </Link> */}
            <button  className="w-full px-4 py-2 text-gray-800 hover:bg-gray-200 flex gap-2"
             onClick={handleLogout}>
                <span ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" clipRule="evenodd" />
                  </svg>
                  </span>
                Logout
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default TopBar;
