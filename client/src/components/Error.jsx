import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
    let error = useRouteError();

  console.error(error);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">{error?.status}, {error?.statusText}</h2>
        <p className="text-red-500 mb-4">{error?.message}</p>
        <div className="text-gray-800">
          <p>Hello 👋</p>
          <p>{error?.error?.message}</p>
          <p>Please Contact Admin  or Go to</p>
        
          <Link to="/" className='bg-blue-500 rounded text-white font-bold py-3 px-2 block w-24  text-center '>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
