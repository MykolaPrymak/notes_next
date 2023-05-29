import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

export const loadPosts: (offset?: number, limit?: number) => Promise<any> = async (offset = 0, limit = 10) => {
    try {
        //const response = await fetch("http://example.com/movies.json");
        //const jsonData = await response.json();
    } catch (e) {
        console.log('load posts failed', e)
    }

    return [
        post1,
        post2,
        post3,
    ];
}