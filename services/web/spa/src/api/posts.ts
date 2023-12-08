// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';

import { PostAPIResponse } from "../store/slices/posts"

export const loadPosts: (offset?: number, limit?: number) => Promise<PostAPIResponse> = async (offset = 0, limit = 10) => {
    try {
        const response = await fetch("/api/posts/?page=1&limit=20");
        return await response.json();
    } catch (e) {
        console.log('load posts failed', e)
    }
    return null;

    /*
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Sample blog post",
                    date: 'April 1, 2020',
                    author: { id: 1, name: 'Olivier', avatar: '' },
                    content: post1,
                    tags: [],
                }, {
                    id: 2,
                    title: "Another blog post",
                    date: 'March 23, 2020',
                    author: { id: 1, name: 'Matt', avatar: '' },
                    content: post2,
                    tags: [],
                },
                {
                    id: 3,
                    title: "New feature",
                    date: 'March 14, 2020',
                    author: { id: 1, name: 'Tom', avatar: '' },
                    content: post3,
                    tags: [],
                }
            ]);
        }, 2000)
    });
    */
}