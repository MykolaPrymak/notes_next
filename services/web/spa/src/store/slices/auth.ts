import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { REQUEST_STATUS } from "../consts";
import type { RootState } from '..'

import { loadMeInfo, login, logout } from "../../api/auth";

type AuthErrorType = null | string;

export type Me = {
  "id": number;
  "username": string;
  "email": string;
  "name": string;
  "active": boolean;
  "created_at": string;
}

export type LoginData = {
  username: string;
  password: string;
}

export type LoginReply = {
  id: number;
  username: string
}

export interface AuthState {
  me: Me | null;
  status: REQUEST_STATUS;
  error: AuthErrorType;
  loginStatus: REQUEST_STATUS;
  loginError: AuthErrorType;
  logoutStatus: REQUEST_STATUS;
  logoutError: AuthErrorType;
}


// First, create the thunk
export const fetchMeInfo = createAsyncThunk(
  'auth/fetchMeInfo',
  async (arg, thunkAPI) => await loadMeInfo(thunkAPI)
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginData, thunkAPI) => await login(credentials, thunkAPI)
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (arg, thunkAPI) => await logout(thunkAPI)
)

const initialState: AuthState = {
  me: null,
  status: REQUEST_STATUS.IDLE,
  error: null,
  loginStatus: REQUEST_STATUS.IDLE,
  loginError: null,
  logoutStatus: REQUEST_STATUS.IDLE,
  logoutError: null
};

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
    resetLoginError: (state) => {
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch current user info
    builder.addCase(fetchMeInfo.pending, (state) => {
      state.status = REQUEST_STATUS.LOADING;
      state.error = null;
    })
    builder.addCase(fetchMeInfo.rejected, (state, action) => {
      state.status = REQUEST_STATUS.FAIL;
      state.me = null;
      state.error = action.error.message || 'Loading error';
    })
    builder.addCase(fetchMeInfo.fulfilled, (state, action) => {
      if (action.payload.ok) {
        state.status = REQUEST_STATUS.SUCCESS;
        state.me = action.payload.body;
      } else {
        state.status = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    })

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loginStatus = REQUEST_STATUS.LOADING;
      state.loginError = null;
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginStatus = REQUEST_STATUS.FAIL;
      state.loginError = action.error.message || 'Login error';
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.ok) {
        window.location.assign('/');
      } else {
        state.loginError = `${action.payload.body.error}: ${action.payload.body.message}`;
        state.loginStatus = REQUEST_STATUS.FAIL;
      }
    })

    // Logout
    builder.addCase(logoutUser.pending, (state, ...args) => {
      state.logoutStatus = REQUEST_STATUS.LOADING;
      state.logoutError = null;
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.logoutStatus = REQUEST_STATUS.IDLE;
      } else {
        state.logoutStatus = REQUEST_STATUS.FAIL;
        state.logoutError = action.error.message || 'Logout error';
      }
    })
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      if (action.payload.ok) {
        window.location.assign('/');
      } else {
        state.logoutError = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
      state.logoutStatus = REQUEST_STATUS.SUCCESS;
    })
  }
})

// Action creators are generated for each case reducer function
export const { reset: resetAuth, resetLoginError } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getMeInfo = (state: RootState) => state.auth.me;
export const isLoadingMeInfo = (state: RootState) => [REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING].includes(state.auth.status);
export const getError = (state: RootState) => state.auth.error;

export const isLoginInProgress = (state: RootState) => state.auth.loginStatus === REQUEST_STATUS.LOADING;
export const getLoginError = (state: RootState) => state.auth.loginError;

export const isLogoutInProgress = (state: RootState) => state.auth.logoutStatus === REQUEST_STATUS.LOADING;
export const getLogoutError = (state: RootState) => state.auth.logoutError;

export default authSlice.reducer