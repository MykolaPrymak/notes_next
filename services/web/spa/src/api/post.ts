import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import api, { API_RESPONSE_BODY } from "../helpers/api";
import { Post } from "../store/slices/posts";


export const loadPost: (postId: string, thunkAPI: GetThunkAPI<any>) => Promise<API_RESPONSE_BODY<Post>> = async (postId, thunkAPI) => {
    return await api(`/api/posts/${postId}`, { signal: thunkAPI.signal });
}

export const deletePost: (postId: string, thunkAPI: GetThunkAPI<any>) => Promise<API_RESPONSE_BODY<Post>> = async (postId, thunkAPI) => {
    return await api(`/api/posts/${postId}`, { method: 'DELETE', signal: thunkAPI.signal });
}