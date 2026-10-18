import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';


const initialState = {
  //currenting storing it locally in key value format for the time being
  // If we find the data locally use it else use empty array
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;         // fetching the paste that was created

      // Check if title is empty
      if (!paste?.title || paste.title.trim() === '') {
        toast.error("Title cannot be empty");
        return;
      }

      // Check to make sure that a paste with the same title doesn't already exist
      const isAlreadyExists = state.pastes.some(
        (item) => item?.title?.trim().toLowerCase() === paste.title.trim().toLowerCase()
      );

      if (isAlreadyExists) {
        toast.error("Paste with this title already exists");
        return;
      }

      state.pastes.push(paste);             // pushing the paste in our array of pastes
      localStorage.setItem("pastes", JSON.stringify(state.pastes));              // adding the updated pastes array back to the local storage use key value pair

      toast.success('Paste Created Successfully');
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex((item) => (item._id || item.id) === (updatedPaste._id || updatedPaste.id));

      if (index >= 0) {
        // Check if another paste already has this title
        const isAlreadyExists = state.pastes.some(
          (item) =>
            (item._id || item.id) !== (updatedPaste._id || updatedPaste.id) &&
            item?.title?.trim().toLowerCase() === updatedPaste?.title?.trim().toLowerCase()
        );

        if (isAlreadyExists) {
          toast.error("Paste with this title already exists");
          return;
        }

        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success('Paste Updated Successfully');
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast('All Pastes Reset Successfully');
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => (item._id || item.id) === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast('Paste Removed Successfully');
      }
    },

  }
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer