import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { REQUEST_STATUS } from "../consts";

import {
  loadPost,
  deletePost as deletePostRequest,
  updatePost as updatePostRequest,
} from "../../api/post";
import { Post } from "./posts";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (post: PostBody, thunkAPI) => await updatePostRequest(post, thunkAPI)
);

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (postId: string, thunkAPI) => await loadPost(postId, thunkAPI)
);

export const updatePost = createAsyncThunk(
  "post/updatehPost",
  async (post: PostBody, thunkAPI) => await updatePostRequest(post, thunkAPI)
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId: string, thunkAPI) => await deletePostRequest(postId, thunkAPI)
);

export type PostBody = Pick<Post, "title" | "body" | "private" | "tags"> &
  Partial<Pick<Post, "id">>;

export interface PostState {
  post: Post | null;
  status: REQUEST_STATUS;
  error: string | null;
  updateRequestStatus: REQUEST_STATUS;
  deleteRequestStatus: REQUEST_STATUS;
}

const initialState: PostState = {
  post: null,
  status: REQUEST_STATUS.IDLE,
  error: null,
  updateRequestStatus: REQUEST_STATUS.IDLE,
  deleteRequestStatus: REQUEST_STATUS.IDLE,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    // Fetch
    builder.addCase(fetchPost.pending, () => {
      return initialState;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.status = REQUEST_STATUS.IDLE;
      } else {
        state.status = REQUEST_STATUS.FAIL;
        state.error = action.error.message || "Loading error";
      }
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      // Add posts to the state array
      if (action.payload.ok) {
        state.post = action.payload.body;
        state.status = REQUEST_STATUS.SUCCESS;
      } else {
        state.status = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    });

    // Update
    builder.addCase(updatePost.pending, (state) => {
      state.updateRequestStatus = REQUEST_STATUS.LOADING;
      state.error = null;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.updateRequestStatus = REQUEST_STATUS.IDLE;
      } else {
        // TODO: show result notification
        state.updateRequestStatus = REQUEST_STATUS.FAIL;
        state.error = action.error.message || "Loading error";
      }
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      // TODO: show result notification
      if (action.payload.ok) {
        state.updateRequestStatus = REQUEST_STATUS.SUCCESS;
        state.post = null;
      } else {
        state.updateRequestStatus = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    });

    // Delete
    builder.addCase(deletePost.pending, (state) => {
      state.deleteRequestStatus = REQUEST_STATUS.LOADING;
      state.error = null;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.deleteRequestStatus = REQUEST_STATUS.IDLE;
      } else {
        // TODO: show result notification
        state.deleteRequestStatus = REQUEST_STATUS.FAIL;
        state.error = action.error.message || "Loading error";
      }
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      // TODO: show result notification
      if (action.payload.ok) {
        state.deleteRequestStatus = REQUEST_STATUS.SUCCESS;
      } else {
        state.deleteRequestStatus = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset: resetPost } = postSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPost = (state: RootState) => state.post.post;
export const isLoadingPost = (state: RootState) =>
  [REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING].includes(state.post.status);

export const isPostLoadError = (state: RootState) => state.post.status === REQUEST_STATUS.FAIL;
export const isPostLoaded = (state: RootState) => state.post.status === REQUEST_STATUS.SUCCESS;


export const getPostRequestError = (state: RootState) => state.post.error;
export const isPostUpdating = (state: RootState) => state.post.updateRequestStatus === REQUEST_STATUS.LOADING;
export const isPostUpdated = (state: RootState) => state.post.updateRequestStatus === REQUEST_STATUS.SUCCESS;
export const isPostUpdatedError = (state: RootState) => state.post.updateRequestStatus === REQUEST_STATUS.FAIL;

export default postSlice.reducer;
