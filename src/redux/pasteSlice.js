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
    addToPastes: (state,action) => {
      const paste = action.payload;         // fetching the paste that was created
      state.pastes.push(paste);             // pushing the paste in our array of pastes
      localStorage.setItem("pastes", JSON.stringify(state.pastes));              // adding the updated pastes array back to the local storage use key value pair

       toast('Paste Created Successfully')
       
    },
    updateToPastes: (state,action) => {
      
    },
    resetAllPastes: (state, action) => {
      
    },
    removeFromPaste: (state,action) =>{

    },

  }
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer