import * as React from 'react';
import Markdown from '../Markdown';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { Post } from '../../store/slices/posts';
import "./PostPageContent.css";

export interface PostPageContentProp {
  post: Post;
}

const handleChipClick = (navigate: NavigateFunction) => (evt: React.MouseEvent) => {
  evt.preventDefault();
  const url = evt.currentTarget.getAttribute('href');
  if (url) {
    navigate(url);
  }
}

export default function PostPageContent(props: PostPageContentProp) {
  const { post } = props;
  const navigate = useNavigate();

  return (
    <Paper className="post" sx={{
      p: 3,
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
      }
    }}>
      <Typography variant="h4">{post.title}</Typography>

      <Typography className="post-date-author"><em>{post.created_at} by <Link to={`/?author=${encodeURIComponent(post.author.username)}`}>{post.author.username}</Link></em></Typography>

      <Markdown className="markdown">
        {post.body}
      </Markdown>
      {post.tags.map(tag => <Chip
        key={`${post.id}_${encodeURIComponent(tag)}`}
        className='tag'
        label={tag}
        component="a"
        href={`/?tag=${encodeURIComponent(tag)}`}
        onClick={handleChipClick(navigate)}
        clickable />)}
    </Paper>
  );
}
