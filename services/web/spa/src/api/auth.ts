import { Me } from "../store/slices/auth";

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