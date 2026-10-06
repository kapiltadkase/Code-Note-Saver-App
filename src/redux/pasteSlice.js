import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //currenting storing it locally for the time being
    // If we find the data locally use it else use empty array
    pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer