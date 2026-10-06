import { createSlice } from '@reduxjs/toolkit'

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