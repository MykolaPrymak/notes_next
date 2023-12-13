import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { REQUEST_STATUS } from "../consts";

import { loadPost } from "../../api/post";
import { Post } from './posts';

// First, create the thunk
export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId: string) => await loadPost(postId)
)


export interface PostState {
  post: Post | null;
  status: REQUEST_STATUS;
  error: string | null;
}

const initialState: PostState = { post: null, status: REQUEST_STATUS.IDLE, error: null };

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
    // Add reducers for additional action types here, and handle loading state as needed
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
  }
})

// Action creators are generated for each case reducer function
export const { reset: resetPost } = postSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPost = (state: RootState) => state.post.post;
export const isLoadingPost = (state: RootState) => [REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING].includes(state.post.status);

export default postSlice.reducer