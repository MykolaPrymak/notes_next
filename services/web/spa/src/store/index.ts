import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import postsReducer, { PostsState } from './slices/posts'

interface CombinedState {
    posts: PostsState;
}

export const store = configureStore<CombinedState>({
    reducer: {
        posts: postsReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()