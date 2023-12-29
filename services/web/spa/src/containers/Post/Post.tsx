import * as React from 'react';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { fetchPost, isLoadingPost, selectPost, resetPost } from '../../store/slices/post';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import PostSkeleton from '../../components/PostSkeleton';
import PostPageContent from '../../components/PostPageContent';
import { Post } from '../../store/slices/posts';
import Box from '@mui/material/Box';

// import { loginUser, resetLoginError, isLoginInProgress, getLoginError } from '../../store/slices/auth'
// import { useAppDispatch } from '../../store'
// import { useSelector } from 'react-redux'


export default function PostContainer() {
  // reset
  const dispatch = useAppDispatch();
  const post = useSelector(selectPost);
  const isLoading = useSelector(isLoadingPost);
  const { postSlug } = useParams();
  const postId = String(postSlug?.split('-').shift());

  React.useEffect(() => {
    const thunkAction = dispatch(fetchPost(postId));
    
    return () => {
      dispatch(resetPost());
      thunkAction.abort();
    }
  }, [postId])

  return (
    <Box maxWidth="lg">
      {isLoading && <PostSkeleton />}
      {!isLoading && <PostPageContent post={post as Post} />}
    </Box>
  );
}
