import { PostBody } from "../store/slices/post";
import { Post } from "../store/slices/posts";

/**
 * Generating a SLUG string that contains a post.id and a "normalized" post title
 * 
 * "normalized title" means that any sequence of non-alpabetical symbol will be replaced with "_"
 * 
 * @param post The Post object for which we generating the SLUG
 * @returns a SLUG string to use in URL
 */
export const getPostSlug = (post: Post | PostBody) => `${post.id}-${post.title.toLocaleLowerCase().replace(/[^\p{L}]+/gu, ' ').trim().replace(/\s+/g, '_')}`;
