import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from "./redux/pasteSlice"

// Central Redux Store:
// Holds the complete global state of our entire application.
// We register our reducers here under specific state keys.
export const store = configureStore({
  reducer: {
    // 'paste' will be accessible across components via: state.paste
    paste: pasteReducer,
  }
})