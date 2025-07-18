import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '@/store/slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store