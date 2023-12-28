import * as React from 'react';
import Markdown from '../Markdown';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Post } from '../../store/slices/posts';
import "./PostListItem.css";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getPostSlug } from '../../helpers/navigation';

export interface PostListItemProp {
  post: Post;
  filterBy: (key: string, value: string) => void;
  onDelete: (post: Post) => React.MouseEventHandler<HTMLElement>;
}


const filterByTag: (tag: string, filterBy: any) => (evt: React.MouseEvent) => void = (tag, filterBy) => {
  return (evt: React.MouseEvent) => {
    evt.preventDefault();
    const url = evt.currentTarget.getAttribute('href');
    if (url) {
      filterBy("tag", tag)
    }
  }
};

export default function PostListItem(props: PostListItemProp) {
  const { post, filterBy, onDelete } = props;

  return (
    <Paper className="post-item" elevation={1} sx={{
      p: 3,
      mb: 3,
    }}>
      <Typography variant="h4" className='post-title'><Link to={`/posts/${getPostSlug(post)}`} className="post-item-link">{post.title}</Link></Typography>

      <Typography className="post-date-author"><em>{post.created_at} by <Link to={`/?author=${encodeURIComponent(post.author.username)}`}>{post.author.username}</Link></em></Typography>

      <Markdown className="markdown clipped">
        {post.body}
      </Markdown>
      {post.tags.map(tag => <Chip
        key={`${post.id}_${encodeURIComponent(tag)}`}
        className='tag'
        label={tag}
        component="a"
        href={`/?tag=${encodeURIComponent(tag)}`}
        onClick={filterByTag(tag, filterBy)}
        clickable />)}
      <IconButton aria-label="delete" onClick={onDelete(post)}>
        <DeleteIcon />
      </IconButton>
      <Link aria-label="edit" to={`/posts/${getPostSlug(post)}/edit`}>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </Link>
    </Paper>
  );
}
