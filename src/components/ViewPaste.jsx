import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => (p._id || p.id) === id);

  return (
    <div>
      <div className='flex flex-row gap-2 justify-center'>
        <input
          className='border border-gray-300 rounded-md px-2 m-1 w-[32%]'
          type='text'
          placeholder='enter the title'
          value={paste?.title || ''}
          disabled
        />

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

      <div className='mt-5'>
        <textarea
          className='rounded-2xl mt-2 min-w-[500px] p-4 bg-black'
          value={paste?.content || ''}
          placeholder="Enter content here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;