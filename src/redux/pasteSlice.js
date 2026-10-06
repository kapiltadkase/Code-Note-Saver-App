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
    assToPastes: (state,action) => {
      
    },
    updateToPastes: (state,action) => {
      
    },
    resetAllPastes: (state, action) => {
      
    },
    removeFromPaste: (state,action) =>{

    },

  }
})

export const { assToPastes, updateToPastes, resetAllPastes, removeFromPaste } = pasteSliceSlice.actions

export default pasteSliceSlice.reducer