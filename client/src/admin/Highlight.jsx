import React, { useState } from 'react';
import Input from '../components/Input';
const Highlight = ({ onHighlightsChange }) => {
  const [highlights, setHighlights] = useState([{ name: '', description: '' }]);

  const handleAddHighlight = () => {
    setHighlights([...highlights, { name: '', description: '' }]);
  };

  const handleRemoveHighlight = (index) => {
    const updatedHighlights = [...highlights];
    updatedHighlights.splice(index, 1);
    setHighlights(updatedHighlights);
    onHighlightsChange(updatedHighlights); // Send updated highlights data to parent component
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHighlights = [...highlights];
    console.log(name)
    console.log(updatedHighlights)
    updatedHighlights[index][name] = value;
    setHighlights(updatedHighlights);
    onHighlightsChange(updatedHighlights); // Send updated highlights data to parent component
  };

  return (
    <div>
      <h2 className='font-bold text-slate-600  uppercase'>Make Event's General Highlights</h2>
      <button type='button' className='bg-purple-500 text-white p-2  rounded my-2' onClick={handleAddHighlight}>Add Highlight</button>
      {highlights.map((highlight, index) => (
        <div key={index} className='grid grid-cols-2 gap-2'>
          <Input
            type="text"
            placeholder="Name"
            name="name"
            value={highlight.name}
            onChange={(e) => handleChange(index, e)}
          />
         <div className='flex gap-2'>
         <div className='flex-1'>
         <Input
            type="text"
            placeholder="Description"
            name="description"
            value={highlight.description}
            onChange={(e) => handleChange(index, e)}
          />
         </div>
          <button type='button' onClick={() => handleRemoveHighlight(index)} className='bg-red-500 text-white  self-center py-2 px-2 rounded'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>

          </button>
         </div>
        </div>
      ))}
      
    </div>
  );
};

export default Highlight;
