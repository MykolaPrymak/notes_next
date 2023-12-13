import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Post } from '../../store/slices/posts';
import PostListItem from '../PostListItem';

export interface PostsListProps {
  posts: ReadonlyArray<Post>;
  filterBy: (key: string, value: string) => void;
}

export default function PostsList(props: PostsListProps) {
  const { posts, filterBy } = props;

  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        '& .post-item': { py: 2 },
        '& .post-date-author': { mb: 2, fontStyle: 'italic' },
        '& .markdown': {
          display: "block", // TODO: Use container to show markdown box shadow
          pt: 0,
          pb: 1,
          mb: 2,
          maxHeight: "5em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          borderRadius: "0 0 15px 15px",
        },
        '& .markdown.clipped': {
          position: "relative",
        },
        '& .markdown.clipped::after': {
          display: "block",
          width: "100%",
          height: 0,
          position: "absolute",
          background: "transparent",
          bottom: "1em",
          left: 0,
          content: `" "`,
          boxShadow: "0 3em 22px 37px #fff"
        }
      }}
    >
      {posts.map((post, idx) => (
        <PostListItem key={`${idx}_${post.id}`} post={post} filterBy={filterBy} />
      ))}
    </Grid>
  );
}
