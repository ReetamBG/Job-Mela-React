import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '@/store/slices/authSlice'
import { sidebarSlice } from '@/store/slices/sidebarSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sidebar: sidebarSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store