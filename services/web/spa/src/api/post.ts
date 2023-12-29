import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import api, { API_RESPONSE_BODY } from "../helpers/api";
import { Post } from "../store/slices/posts";
import { PostBody } from "../store/slices/post";

export const createPost: (
  post: PostBody,
  thunkAPI: GetThunkAPI<any>
) => Promise<API_RESPONSE_BODY<Post>> = async (post, thunkAPI) => {
  return await api(`/api/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    signal: thunkAPI.signal,
  });
};

export const loadPost: (
  postId: string,
  thunkAPI: GetThunkAPI<any>
) => Promise<API_RESPONSE_BODY<Post>> = async (postId, thunkAPI) => {
  return await api(`/api/posts/${postId}`, { signal: thunkAPI.signal });
};

export const updatePost: (
  post: PostBody,
  thunkAPI: GetThunkAPI<any>
) => Promise<API_RESPONSE_BODY<Post>> = async (post, thunkAPI) => {
  return await api(`/api/posts/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    signal: thunkAPI.signal,
  });
};

export const deletePost: (
  postId: string,
  thunkAPI: GetThunkAPI<any>
) => Promise<API_RESPONSE_BODY<Post>> = async (postId, thunkAPI) => {
  return await api(`/api/posts/${postId}`, {
    method: "DELETE",
    signal: thunkAPI.signal,
  });
};
