import React from 'react'
import { useState } from 'react';

const Home = () => {

  const [title, setTitle] = useState('');

  return (
    <div>
      <input
      className='border border-gray-300 rounded-md px-1 m-2'
        type='text'
        placeholder='enter the title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  )
}

export default Home