import React, { ReactElement } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

interface PostSkeletonProps {
  times?: number;
}

const PostSkeletonItem: React.FC = () => (
  <>
    <Grid
      item
      xs={12}
    >
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} />
      <Skeleton variant="rectangular" height={250} />
    </Grid>
  </>
);

const PostSkeleton: React.FC<PostSkeletonProps> = ({times = 1}:PostSkeletonProps)=> {
  if (times < 2) {
    return <PostSkeletonItem />
  } else {
    return [...Array(times)].map((v, idx) => <PostSkeletonItem key={`pski_${idx}`} />);
  }
};

export default PostSkeleton;