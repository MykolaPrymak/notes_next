import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { REQUEST_STATUS } from "../consts";
import type { RootState } from '../'

import { loadPosts } from "../../api/posts";

// First, create the thunk
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await loadPosts();
    return response;
  }
)


type PostStateErrorType = null | string;

export type Author = {
  id: number;
  name: string;
  avatar: string;
}
export type Post = {
  id: string;
  title: string;
  date: string,
  author: Author,
  content: string;
  tags: string[],

}

export interface PostsState {
  posts: Post[]
  state: REQUEST_STATUS;
  error: PostStateErrorType;
}


const initialState: PostsState = { posts: [], state: REQUEST_STATUS.IDLE, error: null };


export const postsSlice = createSlice({
  name: 'posts',
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
    builder.addCase(fetchPosts.pending, (state) => {
      state.state = REQUEST_STATUS.LOADING;
      state.error = null;
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.state = REQUEST_STATUS.FAIL;
      state.error = action.error.message || 'Loading error';
    })
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
    // Add posts to the state array
      state.posts.push(...action.payload);
      state.state = REQUEST_STATUS.SUCCESS;
    })
    }
})

// Action creators are generated for each case reducer function
export const { reset: resetPosts } = postsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPosts = (state: RootState) => state.posts.posts;
export const isLoadingPosts = (state: RootState) => [REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING].includes(state.posts.state);

export default postsSlice.reducer