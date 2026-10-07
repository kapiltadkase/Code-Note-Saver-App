import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();                                      // to dispatch the reducer

  // handler for what happen when create paste button is clicked
  function createPaste(){
    // role is to create paste and send it to slice
    const paste = {
      title: title,    
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }


    if(pasteId){
      // if pasteId already present then we are trying to update the already existing paste
      dispatch(updateToPastes(paste));
    }
    else{
      // we are creating a new paste
      dispatch(addToPastes(paste))
    }

    // after creation or updation we want to clear all input field
    setTitle('');
    setValue('')
    setSearchParams({});
  }

  return (
    <div>
      <div className='flex flex-row gap-2 justify-center'>
        <input
          className='border border-gray-300 rounded-md px-2 m-1 w-[32%]'
          type='text'
          placeholder='enter the title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button 
          className='bg-black rounded-md px-2'
          onClick={createPaste}
        >
          { 
            pasteId ? "Update Paste" : "Create Paste"
          }
        </button>
      </div>

      <div className='mt-5'>
        <textarea
          className='rounded-2xl mt-2 min-w-[500px] p-4 bg-black'
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home