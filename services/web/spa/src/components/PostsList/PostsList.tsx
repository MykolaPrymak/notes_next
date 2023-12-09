import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from '../Markdown';
import { Post } from '../../store/slices/posts'
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';

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
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post, idx) => (
        <div className="post-item" key={`${idx}_${post.id}`}>
          <Typography variant="h4">{post.title}</Typography>

          <Typography className="post-date-author"><em>{post.created_at} by <Link to={`/author/${post.author.id}`}>{post.author.username}</Link></em></Typography>

          <Markdown className="markdown clipped">
            {post.body}
          </Markdown>
          {post.tags.map(tag => <Chip key={`${post.id}_${encodeURIComponent(tag)}`} label={tag} component="a" href={`/?tag=${encodeURIComponent(tag)}`} clickable />)}          
        </div>
      ))}
      <Pagination count={10} size="large" shape="rounded" />
    </Grid>
  );
}
