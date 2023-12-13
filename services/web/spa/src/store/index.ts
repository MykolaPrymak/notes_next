import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer, { AuthState } from './slices/auth'
import postReducer, { PostState } from './slices/post'
import postsReducer, { PostsState } from './slices/posts'

interface CombinedState {
    auth: AuthState;
    posts: PostsState;
    post: PostState;
}

export const store = configureStore<CombinedState>({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        post: postReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()