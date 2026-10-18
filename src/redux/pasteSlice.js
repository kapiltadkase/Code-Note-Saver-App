import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

// Initial state: Grab any saved pastes from the browser's localStorage.
// If there aren't any saved yet, default to an empty list [].
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    // 1. CREATE A NEW PASTE
    addToPastes: (state, action) => {
      const paste = action.payload; // This is the new paste object coming from the UI

      // Guard check: Don't allow creating a paste without a title
      if (!paste?.title || paste.title.trim() === '') {
        toast.error("Title cannot be empty");
        return;
      }

      // Check if a paste with this exact title already exists (case-insensitive & trimmed)
      const isAlreadyExists = state.pastes.some(
        (item) => item?.title?.trim().toLowerCase() === paste.title.trim().toLowerCase()
      );

      // If it exists, alert the user and stop execution
      if (isAlreadyExists) {
        toast.error("Paste with this title already exists");
        return;
      }

      // Add the new paste to our Redux state list
      state.pastes.push(paste);

      // Save the updated list to localStorage so it stays even if we refresh the page
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      // Show a nice green success notification
      toast.success('Paste Created Successfully');
    },

    // 2. UPDATE AN EXISTING PASTE
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload; // The edited paste data

      // Find where this paste is located in our array using its ID
      const index = state.pastes.findIndex(
        (item) => (item._id || item.id) === (updatedPaste._id || updatedPaste.id)
      );

      // If we found the paste in our list
      if (index >= 0) {
        // Make sure the new title isn't already taken by ANOTHER paste
        const isAlreadyExists = state.pastes.some(
          (item) =>
            (item._id || item.id) !== (updatedPaste._id || updatedPaste.id) &&
            item?.title?.trim().toLowerCase() === updatedPaste?.title?.trim().toLowerCase()
        );

        // If duplicate title found on another paste, show error and stop
        if (isAlreadyExists) {
          toast.error("Paste with this title already exists");
          return;
        }

        // Replace the old paste at this position with the updated paste
        state.pastes[index] = updatedPaste;

        // Persist the changes into localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        // Show update confirmation toast
        toast.success('Paste Updated Successfully');
      }
    },

    // 3. CLEAR ALL PASTES
    resetAllPastes: (state, action) => {
      // Empty out the array in state
      state.pastes = [];

      // Remove / overwrite all pastes in localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      // Show reset confirmation
      toast.success('All Pastes Reset Successfully');
    },

    // 4. DELETE A SPECIFIC PASTE
    removeFromPastes: (state, action) => {
      const pasteId = action.payload; // The ID of the paste to delete

      // Find the position of the paste we want to remove
      const index = state.pastes.findIndex((item) => (item._id || item.id) === pasteId);

      // If the paste is found in the array
      if (index >= 0) {
        // Remove 1 item at this index
        state.pastes.splice(index, 1);

        // Save the remaining pastes back into localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        // Let the user know it was deleted
        toast.success('Paste Removed Successfully');
      }
    },
  }
})

// Export the action creators so our components can dispatch them
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

// Export the reducer to be plugged into the Redux store
export default pasteSlice.reducer