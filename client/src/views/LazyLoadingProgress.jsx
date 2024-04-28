import React from 'react';

const LazyLoadingProgress = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="relative w-24 h-24">
     
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-semibold">
          Powered by Itech
        </div>
      </div>
    </div>
  );
};

export default LazyLoadingProgress;
