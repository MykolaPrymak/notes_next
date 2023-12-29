export interface API_RESPONSE_BODY<Type = any> {
    ok: boolean;
    status: number;
    body: Partial<API_ERROR_RESPONSE_BODY> & Type;
    headers?: Headers;
    url: string;
}

export interface API_ERROR_RESPONSE_BODY {
    // Short error name
    error: string; // Short error name
    message: string; // Error description
}

export type API_ARG_TYPE = "string" | "number" | "boolean";
export type API_VALUE_TYPES = string | number | boolean | null;

export interface ApiArgumentDescription<T extends string> {
    key: T;
    type: API_ARG_TYPE;
    defaultValue: API_VALUE_TYPES;
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
export const api: <Type>(resource: string | RequestInfo, options?: RequestInit) => Promise<API_RESPONSE_BODY<Type>> = async (resource, options) => {
    const { headers = {}, ...rest } = options || {};
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

export const process_url_search_params: <ARG_NAMES_TYPE extends string>(searchParam: URLSearchParams, argDescription: ApiArgumentDescription<ARG_NAMES_TYPE>[]) => Map<ARG_NAMES_TYPE, API_VALUE_TYPES> = (searchParam, argDescription) => {
    const args = new Map();

    argDescription.forEach(arg_desc => {
        const { key, defaultValue, type } = arg_desc;
        if (searchParam.has(key)) {
            let value: API_VALUE_TYPES = searchParam.get(key);

            if (type === "string") {
                value = String(value);
            } else if (type === "boolean") {
                value = Boolean(value);
            } else if (type === "number") {
                value = Number(value);
                if (isNaN(value)) {
                    value = defaultValue;
                }
            }
            args.set(key, value);
        } else if (defaultValue) { // Here we will skip the falsy default values
            args.set(key, defaultValue);
        }
    });

    return args;
}

export const map_to_url_search_params: (mapped_arguments: Map<string, API_VALUE_TYPES>) => URLSearchParams = (mapped_arguments) => {
    const searchParam = new URLSearchParams();
    for (const [key, value] of mapped_arguments) {
        searchParam.set(key, String(value));
    }

    return searchParam;

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