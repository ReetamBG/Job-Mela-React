import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  resolved: boolean
}

const initialState: AuthState = {
  user: null,
  resolved: false, // Indicates whether the user state has been resolved
};

export const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload; 
      state.resolved = true; 
    },
    clearUser: (state) => {
      state.user = null;
      state.resolved = false; 
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsUserResolved = (state: RootState) => state.auth.resolved;

export default authSlice.reducer;
