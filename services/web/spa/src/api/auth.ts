import { Me, LoginReply, LoginData } from "../store/slices/auth";
import api, { API_RESPONSE_BODY } from "../helpers/api";

export const loadMeInfo: () => Promise<Me> = async () => {
    /**
     * TODO: allow to cancell request
     * const controller = new AbortController()
     */
    try {
        const response = await fetch("/api/auth/me");
        return await response.json();
    } catch (e) {
        console.log('load posts failed', e)
    }
}

const awaitFor = (timeout: number, signal?: AbortSignal) => {
    return new Promise<void>((resolve, reject) => {

        const timeoutId = setTimeout(() => resolve(), timeout);

        signal?.addEventListener("abort", () => {
            clearTimeout(timeoutId);
            reject('Aborted')
        })
    });
}


export const login: (credentials: LoginData) => Promise<API_RESPONSE_BODY<LoginReply>> = async (credentials) => {
    /**
     * TODO: allow to cancell request
     * const controller = new AbortController()
     */
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    //await awaitFor(2000);

    return await api("/api/auth/login", {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            // Content-Type': 'multipart/form-data',
            // 'Content-Type': undefined,
        },
        body: JSON.stringify(credentials)
        //body: formData
    });
}

export const logout: () => Promise<API_RESPONSE_BODY> = async () => {
    // await awaitFor(2000);

    return await api("/api/auth/logout", {
        method: "POST",
        // signal
    });
}