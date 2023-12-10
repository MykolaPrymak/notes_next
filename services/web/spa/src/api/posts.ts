import { PostAPIResponse } from "../store/slices/posts"

export const loadPosts: (offset?: number, limit?: number) => Promise<PostAPIResponse> = async (offset = 0, limit = 10) => {
    try {
        const response = await fetch("/api/posts/?page=1&limit=20");
        return await response.json();
    } catch (e) {
        console.log('load posts failed', e)
    }
    return null;
}