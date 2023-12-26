import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { Me, LoginReply, LoginData } from "../store/slices/auth";
import api, { API_RESPONSE_BODY } from "../helpers/api";

export const loadMeInfo: (thunkAPI: GetThunkAPI<any>) => Promise<API_RESPONSE_BODY<Me>> = async (thunkAPI) => {
    return await api("/api/auth/me", { signal: thunkAPI.signal });
}

export const login: (credentials: LoginData, thunkAPI: GetThunkAPI<any>) => Promise<API_RESPONSE_BODY<LoginReply>> = async (credentials, thunkAPI) => {
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return await api("/api/auth/login", {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            // Content-Type': 'multipart/form-data',
            // 'Content-Type': undefined,
        },
        body: JSON.stringify(credentials),
        //body: formData,
        signal: thunkAPI.signal
    });
}

export const logout: (thunkAPI: GetThunkAPI<any>) => Promise<API_RESPONSE_BODY> = async (thunkAPI) => {
    return await api("/api/auth/logout", {
        method: "POST",
        signal: thunkAPI.signal
    });
}