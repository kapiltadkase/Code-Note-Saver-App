import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
  // Grab all saved pastes from our global Redux store
  const pastes = useSelector((state) => state.paste.pastes);

  // Local state to keep track of what user types in the search bar
  const [searchTerm, setSearchTerm] = useState('');

  // Hook to dispatch actions to our Redux reducers
  const dispatch = useDispatch();

  // Filter pastes in real-time based on whether title matches the search query (case-insensitive)
  const filteredData = pastes.filter(
    (paste) => paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to delete a paste by its unique ID
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      {/* Search Input Field */}
      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5 bg-black'
        type='search'
        placeholder='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* List of filtered pastes */}
      <div className='flex flex-col justify-center gap-5'>
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div key={paste?._id || paste?.id} className='border p-2 min-w-[600px]'>
                {/* Paste Title & Content Preview */}
                <div>{paste.title}</div>
                <div>{paste.content}</div>

                {/* Action Buttons Row */}
                <div className='flex flex-row gap-4 place-content-evenly bg-black mt-2'>

                  {/* 1. Edit: Opens the Home page with this paste's ID in URL query */}
                  <button>
                    <Link to={`/?pasteId=${paste?._id || paste?.id}`}>Edit</Link>
                  </button>

                  {/* 2. View: Navigates to dedicated view-only page */}
                  <button>
                    <Link to={`/pastes/${paste?._id || paste?.id}`}>View</Link>
                  </button>

                  {/* 3. Copy: Copies the paste text content to user's clipboard */}
                  <button onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("copied to clipboard");
                  }}>
                    Copy
                  </button>

                  {/* 4. Delete: Removes the paste from Redux state and localStorage */}
                  <button onClick={() => handleDelete(paste?._id || paste?.id)}>
                    Delete
                  </button>

                  {/* 5. Share: Copies link to this specific paste to clipboard */}
                  <button onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/pastes/${paste?._id || paste?.id}`);
                    toast.success("Link Copied to clipboard");
                  }}>
                    Share
                  </button>

                </div>

                {/* Creation Date/Time display */}
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