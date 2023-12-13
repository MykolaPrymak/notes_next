import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const PostSkeleton: React.FC = () => (
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

export default PostSkeleton;