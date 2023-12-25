import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../';
import { REQUEST_STATUS } from "../consts";

import { loadPosts } from "../../api/posts";
import { API_VALUE_TYPES } from '../../helpers/api';

// First, create the thunk
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (args: Map<POST_API_ARG_NAMES, API_VALUE_TYPES>) => await loadPosts(args)
)

export type PostAPIResponse = {
  count: number;
  posts: Post[];
}

type PostStateErrorType = null | string;

export type Author = {
  id: number;
  username: string;
  // avatar: string;
}
export type Post = {
  id: string;
  title: string;
  body: string;
  author: Author,
  private: boolean,
  tags: string[],
  created_at: string,
  updated_at: string,
}

export type POST_API_ARG_NAMES = "page" | "limit" | "tag" | "author";


export interface PostsState {
  posts: Post[];
  // currentPage: number;
  // postsPerPage: number;
  totalPosts: number;
  status: REQUEST_STATUS;
  error: PostStateErrorType;
}

const initialState: PostsState = { posts: [], totalPosts: 0, status: REQUEST_STATUS.IDLE, error: null };


export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = REQUEST_STATUS.LOADING;
      state.posts = [];
      state.error = null;
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.status = REQUEST_STATUS.IDLE;
      } else {
        state.status = REQUEST_STATUS.FAIL;
        state.error = action.error.message || 'Loading error';
      }
    })
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      // Add posts to the state array
      if (action.payload.ok) {
        state.posts = [...action.payload.body.posts];
        state.totalPosts = action.payload.body.count;
        state.status = REQUEST_STATUS.SUCCESS;
      } else {
        state.status = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    })
  }
})

// Action creators are generated for each case reducer function
export const { reset: resetPosts } = postsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectTotalPostCount = (state: RootState) => state.posts.totalPosts;
export const isLoadingPosts = (state: RootState) => [REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING].includes(state.posts.status);

export default postsSlice.reducer