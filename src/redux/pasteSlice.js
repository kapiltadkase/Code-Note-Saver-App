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

      // add a check to make sure that the title that is give doesnt already exists
      const isAlreadyExists = state.pastes.find((item) => item.title.trim().toLowerCase() == paste.title.trim().toLowerCase());
      if (isAlreadyExists) {
        return toast.error("Paste with this title already exists");
      }

      state.pastes.push(paste);             // pushing the paste in our array of pastes
      localStorage.setItem("pastes", JSON.stringify(state.pastes));              // adding the updated pastes array back to the local storage use key value pair

      toast('Paste Created Successfully')

    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === updatedPaste.id);

      if (index >= 0) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast('Paste Updated Successfully');
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast('All Pastes Reset Successfully');
    },
    removeFromPaste: (state, action) => {
      const id = action.payload;

      console.log(id);
      const index = state.pastes.findIndex((item) => item.id === id);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast('Paste Removed Successfully');
      }
    },

  }
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer