import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import api, { API_RESPONSE_BODY, API_VALUE_TYPES, map_to_url_search_params } from "../helpers/api";
import { POST_API_ARG_NAMES, PostAPIResponse } from "../store/slices/posts";

export const loadPosts: (params: Map<POST_API_ARG_NAMES, API_VALUE_TYPES>, thunkAPI: GetThunkAPI<any>) => Promise<API_RESPONSE_BODY<PostAPIResponse>> = async (params, thunkAPI) => {

    const urlParams = map_to_url_search_params(params);

    return await api(`/api/posts/${urlParams.size ? `?${urlParams.toString()}` : ''}`, { signal: thunkAPI.signal });
}