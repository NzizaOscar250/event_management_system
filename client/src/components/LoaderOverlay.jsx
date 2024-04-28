import React, { useState } from 'react';

const LoaderOverlay = ({loading,title}) => {
  

  return (
    <>
      <div id="loader-overlay" className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col
     justify-center items-center z-50 ${loading ? '' : 'hidden'}`}>
      <div className="loader border-8  border-t-8 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      <p className='my-2 py-2 bg-gray-500 absolute top-[60%] left-[52%] -translate-x-1/2 px-2 text-gray-100 rounded-sm'>{title}</p>
    </div>
    
    </>
  );
};

export default LoaderOverlay;
