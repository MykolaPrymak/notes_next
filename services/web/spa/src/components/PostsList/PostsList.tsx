import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Post } from '../../store/slices/posts';
import PostListItem from '../PostListItem';
import { Me } from '../../store/slices/auth';

export interface PostsListProps {
  me: Me | null;
  posts: ReadonlyArray<Post>;
  onDelete: (post: Post) => React.MouseEventHandler<HTMLElement>;
}

export default function PostsList(props: PostsListProps) {
  const { me, posts, onDelete } = props;

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
        <PostListItem key={`${idx}_${post.id}`} post={post} isEditable={post.author.id === me?.id} onDelete={onDelete} />
      ))}
    </Grid>
  );
}
