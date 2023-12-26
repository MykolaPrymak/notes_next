import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { REQUEST_STATUS } from "../consts";

import { loadPost, deletePost as deletePostRequest } from "../../api/post";
import { Post } from './posts';

// First, create the thunk
export const fetchPost = createAsyncThunk(
  'post/fetchPost',
  async (postId: string, thunkAPI) => await loadPost(postId, thunkAPI)
)

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId: string, thunkAPI) => await deletePostRequest(postId, thunkAPI)
)


export interface PostState {
  post: Post | null;
  status: REQUEST_STATUS;
  error: string | null;
  deleteRequestStatus: REQUEST_STATUS;
}

const initialState: PostState = { post: null, status: REQUEST_STATUS.IDLE, error: null, deleteRequestStatus: REQUEST_STATUS.IDLE };

export const postSlice = createSlice({
  name: 'post',
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
    // Add reducers for additional action types here, and handle loading state as needed

    // Fetch
    builder.addCase(fetchPost.pending, (state) => {
      state = initialState;
    })
    builder.addCase(fetchPost.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.status = REQUEST_STATUS.IDLE;
      } else {
        state.status = REQUEST_STATUS.FAIL;
        state.error = action.error.message || 'Loading error';
      }
    })
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      // Add posts to the state array
      if (action.payload.ok) {
        state.post = action.payload.body;
        state.status = REQUEST_STATUS.SUCCESS;
      } else {
        state.status = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    })

    // Delete
    builder.addCase(deletePost.pending, (state) => {
      state.deleteRequestStatus = REQUEST_STATUS.IDLE;
      state.error = null;
    })
    builder.addCase(deletePost.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.deleteRequestStatus = REQUEST_STATUS.IDLE;
      } else {
        // TODO: show result notification
        state.deleteRequestStatus = REQUEST_STATUS.FAIL;
        state.error = action.error.message || 'Loading error';
      }
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      // TODO: show result notification
      if (action.payload.ok) {
        state.deleteRequestStatus = REQUEST_STATUS.SUCCESS;
      } else {
        state.deleteRequestStatus = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    })
  }
})

// Action creators are generated for each case reducer function
export const { reset: resetPost } = postSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPost = (state: RootState) => state.post.post;
export const isLoadingPost = (state: RootState) => [REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING].includes(state.post.status);

export default postSlice.reducer