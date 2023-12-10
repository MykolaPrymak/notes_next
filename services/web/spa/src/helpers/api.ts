export interface API_RESPONSE_BODY<Type = any> {
    ok: boolean;
    status: number;
    body: Partial<API_ERROR_RESPONSE_BODY> & Partial<API_STATUS_RESPONSE_BODY> & Type;
    headers?: Headers;
    url: string;
}

export interface API_ERROR_RESPONSE_BODY {
    error: string;
    message: string;
}

export interface API_STATUS_RESPONSE_BODY {
    status: "ok";
}

/**
 * This is wrapper function for fetch to add additional functionality and fields to the return value.
 * 
 * For POST/PUT/etc. requests, by default "Content-Type" is set to "application/json".
 * If FormData object used as request body - the "Content-Type" header won't be set by default
 * 
 * @param resource URL of the API endpoint
 * @param options Additional fetch options
 * @returns API_RESPONSE_BODY<Type>
 */
export const api : <Type>(resource: string | RequestInfo, options?: RequestInit) => Promise<API_RESPONSE_BODY<Type>> = async (resource, options) => {
    const {headers = {}, ...rest} = options || {};
    let contentTypeHeader = {};

    // If we not have an FormData instance in body - send data as JSON
    if (!(rest?.body instanceof FormData)) {
        contentTypeHeader = {
            "Content-Type": "application/json"
        };
    }

    /**
     * TODO: allow to cancell request
     * const controller = new AbortController()
     * https://redux-toolkit.js.org/api/createAsyncThunk
     */

    const response = await fetch(resource, {
        headers: {
            ...contentTypeHeader,
            ...headers
        },
        ...rest,

    });
    
    const body = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        body,
        // headers: JSON.parse(JSON.stringify(response.headers)),
        url: response.url,
    }
}


export const awaitFor = (timeout: number, signal?: AbortSignal) => {
    return new Promise<void>((resolve, reject) => {

        const timeoutId = setTimeout(() => resolve(), timeout);

        signal?.addEventListener("abort", () => {
            clearTimeout(timeoutId);
            reject('Aborted')
        })
    });
}

export default api;