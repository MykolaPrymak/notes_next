import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from '../Markdown';
import { Post } from '../../store/slices/posts'
import { Link } from 'react-router-dom';

export interface PostsListProps {
  posts: ReadonlyArray<Post>;
  title: string;
}

export default function PostsList(props: PostsListProps) {
  const { posts, title } = props;

  console.log(title, posts);

  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        '& .post-item': {py: 2},
        '& .post-date-author': {mb: 2, fontStyle: 'italic'},
        '& .markdown': {
          py: 0,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post, idx) => (
        <div className="post-item" key={`${idx}_${post.id}_${post.date}`}>
          <Typography variant="h4">{post.title}</Typography>

          <Typography className="post-date-author"><em>{post.date} by <Link to={`/author/${post.author.id}`}>{post.author.name}</Link></em></Typography>

          <Markdown className="markdown">
            {post.content}
          </Markdown>
        </div>
      ))}
    </Grid>
  );
}
