import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5 bg-black'
        type='search'
        placeholder='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col justify-center gap-5'>
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div key={paste?._id || paste?.id} className='border p-2 min-w-[600px]'>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className='flex flex-row gap-4 place-content-evenly bg-black mt-2'>

                  <button>Edit</button>

                  <button>View</button>

                  <button onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("copied to clipboard");
                  }}>Copy</button>

                  <button onClick={() => handleDelete(paste?._id || paste?.id)}>Delete</button>

                  <button onClick={() => {
                    navigator.clipboard.writeText(window.location.href + "?pasteId=" + paste?._id || paste?.id)
                    toast.success("Link Copied to clipboard")
                  }}>Share</button>

                </div>
                <div>{paste.createdAt}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Paste