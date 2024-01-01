import * as React from 'react';
import Markdown from '../Markdown';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Post } from '../../store/slices/posts';
import "./PostPageContent.css";
import PostFooter from '../PostFooter';

export interface PostPageContentProp {
  post: Post;
}

export default function PostPageContent(props: PostPageContentProp) {
  const { post } = props;
  return (
    <Paper className="post" sx={{
      p: 3,
      '& .post-date-author': { mb: 2, fontStyle: 'italic' },
      '& .markdown': {
        display: "block", // TODO: Use container to show markdown box shadow
        pt: 0,
        pb: 1,
        mb: 2,
        overflow: "auto",
      }
    }}>
      <Typography variant="h4" className='post-title'>{post.title}</Typography>

      <Typography className="post-date-author"><em>{post.created_at} by <Link to={`/?author=${encodeURIComponent(post.author.username)}`}>{post.author.username}</Link></em></Typography>

      <Markdown className="markdown">
        {post.body}
      </Markdown>

      <PostFooter post={post} onDelete={function (post: Post): React.MouseEventHandler<HTMLElement> {
        return () => {throw new Error('Function not implemented.');}
      } } />
    </Paper>
  );
}
