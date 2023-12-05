import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import postsReducer, { PostsState } from './slices/posts'
import authReducer, { AuthState } from './slices/auth'

interface CombinedState {
    posts: PostsState;
    auth: AuthState;
}

export const store = configureStore<CombinedState>({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()