import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ViewPaste = () => {
  // Extract the unique paste ID from the URL path (/pastes/:id)
  const { id } = useParams();

  // Retrieve all pastes from the central Redux store
  const allPastes = useSelector((state) => state.paste.pastes);

  // Find the specific paste that matches the ID in the URL
  const paste = allPastes.find((p) => (p._id || p.id) === id);

  return (
    <div>
      {/* Title display and Copy Button */}
      <div className='flex flex-row gap-2 justify-center'>
        <input
          className='border border-gray-300 rounded-md px-2 m-1 w-[32%]'
          type='text'
          placeholder='enter the title'
          value={paste?.title || ''}
          // Disabled to keep it in read-only / view-only mode
          disabled
        />

        {/* Copy button to quickly grab paste content to clipboard */}
        <button
          className='bg-black rounded-md px-3 py-1'
          onClick={() => {
            if (paste?.content) {
              navigator.clipboard.writeText(paste.content);
              toast.success("Copied to clipboard");
            } else {
              toast.error("No content to copy");
            }
          }}
        >
          Copy
        </button>
      </div>

      {/* Content display area */}
      <div className='mt-5'>
        <textarea
          className='rounded-2xl mt-2 min-w-[500px] p-4 bg-black'
          value={paste?.content || ''}
          placeholder="Enter content here"
          // Disabled so user can view without accidental editing
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;