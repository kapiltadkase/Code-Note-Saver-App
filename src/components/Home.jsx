import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  // Local state for the paste title and text content
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  // Hook to read & modify query parameters from URL (e.g. ?pasteId=xyz)
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  // Hook to dispatch actions to our Redux store
  const dispatch = useDispatch();

  // Get all existing pastes from Redux state
  const allPastes = useSelector((state) => state.paste.pastes);

  // Whenever `pasteId` in URL changes:
  // - If pasteId exists: find that paste and pre-fill title & content for editing
  // - If pasteId is null: clear fields back to empty for fresh creation
  useEffect(() => {
    if (pasteId) {
      const findPaste = allPastes.find((paste) => (paste._id || paste.id) === pasteId);
      if (findPaste) {
        setTitle(findPaste.title);
        setValue(findPaste.content);
      }
    } else {
      setTitle('');
      setValue('');
    }
  }, [pasteId]);

  // Main function called when clicking "Create Paste" or "Update Paste"
  function createPaste() {
    // Construct the paste object
    const paste = {
      title: title,
      content: value,
      // If editing, reuse the existing pasteId; otherwise generate a new unique timestamp ID
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      // 1. EDIT MODE: We have a pasteId, so update the existing paste in store
      dispatch(updateToPastes(paste));
    } else {
      // 2. CREATE MODE: No pasteId, so create and save a new paste
      dispatch(addToPastes(paste));
    }

    // After creating or updating: clear inputs and remove ?pasteId=... from URL
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      {/* Top Controls: Title Input & Submit Button */}
      <div className='flex flex-row gap-2 justify-center'>
        <input
          className='border border-gray-300 rounded-md px-2 m-1 w-[32%]'
          type='text'
          placeholder='enter the title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Dynamic button text based on whether we are editing or creating */}
        <button
          className='bg-black rounded-md px-2'
          onClick={createPaste}
        >
          {
            pasteId ? "Update Paste" : "Create Paste"
          }
        </button>
      </div>

      {/* Main Content: Big Textarea for Code or Notes */}
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

export default Home;