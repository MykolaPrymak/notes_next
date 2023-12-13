import api, { API_RESPONSE_BODY } from "../helpers/api";
import { Post } from "../store/slices/posts";


export const loadPost: (postId: string) => Promise<API_RESPONSE_BODY<Post>> = async (postId) => {
    return await api(`/api/posts/${postId}`);
}