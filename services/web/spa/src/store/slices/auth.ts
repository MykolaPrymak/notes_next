import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { REQUEST_STATUS } from "../consts";
import type { RootState } from '..'

import { loadMeInfo } from "../../api/auth";

// First, create the thunk
export const fetchMeInfo = createAsyncThunk(
  'auth/fetchMeInfo',
  async () => await loadMeInfo()
)


type AuthErrorType = null | string;

export type Me = {
  "id": number;
  "username": string;
  "email": string;
  "name": string;
  "active": boolean;
  "created_at": string;
}

export interface AuthState {
  me: Me | null;
  state: REQUEST_STATUS;
  error: AuthErrorType;
}

const initialState: AuthState = { me: null, state: REQUEST_STATUS.IDLE, error: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state = initialState;

    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMeInfo.pending, (state) => {
      state.state = REQUEST_STATUS.LOADING;
      state.error = null;
    })
    builder.addCase(fetchMeInfo.rejected, (state, action) => {
      state.state = REQUEST_STATUS.FAIL;
      state.me = null;
      state.error = action.error.message || 'Loading error';
    })
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchMeInfo.fulfilled, (state, action) => {
      // Add posts to the state array
      state.me = action.payload;
      state.state = REQUEST_STATUS.SUCCESS;
    })
  }
})

// Action creators are generated for each case reducer function
export const { reset: resetAuth } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getMeInfo = (state: RootState) => state.auth.me;
export const isLoadingMeInfo = (state: RootState) => [REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING].includes(state.auth.state);

export default authSlice.reducer