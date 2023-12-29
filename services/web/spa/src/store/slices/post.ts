import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { REQUEST_STATUS } from "../consts";

import {
  loadPost,
  deletePost as deletePostRequest,
  updatePost as updatePostRequest,
  createPost as createPostRequest,
} from "../../api/post";
import { Post } from "./posts";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (post: PostBody, thunkAPI) => await createPostRequest(post, thunkAPI)
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
  loadStatus: REQUEST_STATUS;
  createStatus: REQUEST_STATUS;
  updateStatus: REQUEST_STATUS;
  deleteStatus: REQUEST_STATUS;
  error: string | null;
}

const initialState: PostState = {
  post: null,
  loadStatus: REQUEST_STATUS.IDLE,
  createStatus: REQUEST_STATUS.IDLE,
  updateStatus: REQUEST_STATUS.IDLE,
  deleteStatus: REQUEST_STATUS.IDLE,
  error: null,
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
        state.loadStatus = REQUEST_STATUS.IDLE;
      } else {
        state.loadStatus = REQUEST_STATUS.FAIL;
        state.error = action.error.message || "Loading error";
      }
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      // Add posts to the state array
      if (action.payload.ok) {
        state.post = action.payload.body;
        state.loadStatus = REQUEST_STATUS.SUCCESS;
      } else {
        state.loadStatus = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    });

    // Create
    builder.addCase(createPost.pending, (state) => {
      state.createStatus = REQUEST_STATUS.LOADING;
      state.error = null;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.createStatus = REQUEST_STATUS.IDLE;
      } else {
        // TODO: show result notification
        state.createStatus = REQUEST_STATUS.FAIL;
        state.error = action.error.message || "Create error";
      }
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      // TODO: show result notification
      if (action.payload.ok) {
        state.createStatus = REQUEST_STATUS.SUCCESS;
      } else {
        state.createStatus = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    });

    // Update
    builder.addCase(updatePost.pending, (state) => {
      state.updateStatus = REQUEST_STATUS.LOADING;
      state.error = null;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.updateStatus = REQUEST_STATUS.IDLE;
      } else {
        // TODO: show result notification
        state.updateStatus = REQUEST_STATUS.FAIL;
        state.error = action.error.message || "Update error";
      }
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      // TODO: show result notification
      if (action.payload.ok) {
        state.updateStatus = REQUEST_STATUS.SUCCESS;
      } else {
        state.updateStatus = REQUEST_STATUS.FAIL;
        state.error = `${action.payload.body.error}: ${action.payload.body.message}`;
      }
    });

    // Delete
    builder.addCase(deletePost.pending, (state) => {
      state.deleteStatus = REQUEST_STATUS.LOADING;
      state.error = null;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      if (action.meta.aborted) {
        state.deleteStatus = REQUEST_STATUS.IDLE;
      } else {
        // TODO: show result notification
        state.deleteStatus = REQUEST_STATUS.FAIL;
        state.error = action.error.message || "Delete error";
      }
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      // TODO: show result notification
      if (action.payload.ok) {
        state.deleteStatus = REQUEST_STATUS.SUCCESS;
      } else {
        state.deleteStatus = REQUEST_STATUS.FAIL;
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
  [REQUEST_STATUS.IDLE, REQUEST_STATUS.LOADING].includes(state.post.loadStatus);

export const isPostLoadError = (state: RootState) => state.post.loadStatus === REQUEST_STATUS.FAIL;
export const isPostLoaded = (state: RootState) => state.post.loadStatus === REQUEST_STATUS.SUCCESS;

export const isPostCreating = (state: RootState) => state.post.createStatus === REQUEST_STATUS.LOADING;
export const isPostCreateError = (state: RootState) => state.post.createStatus === REQUEST_STATUS.FAIL;



export const isPostUpdating = (state: RootState) => state.post.updateStatus === REQUEST_STATUS.LOADING;
export const isPostUpdated = (state: RootState) => state.post.updateStatus === REQUEST_STATUS.SUCCESS;
export const isPostUpdatedError = (state: RootState) => state.post.updateStatus === REQUEST_STATUS.FAIL;

export const getPostRequestError = (state: RootState) => state.post.error;

export default postSlice.reducer;
