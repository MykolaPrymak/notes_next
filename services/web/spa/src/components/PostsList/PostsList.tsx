import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../store/slices/posts';
import Markdown from '../Markdown';
import "./PostList.css";
export interface PostsListProps {
  posts: ReadonlyArray<Post>;
  filterBy: (key: string, value: string) => void;
}

const filterByTag: (tag: string, filterBy: any) => (evt: React.MouseEvent) => void = (tag, filterBy) => {
  return (evt: React.MouseEvent) => {
    evt.preventDefault();
    const url = evt.currentTarget.getAttribute('href');
    if (url) {
      filterBy("tag", tag)
    }
  }
}

export default function PostsList(props: PostsListProps) {
  const { posts, filterBy } = props;
  /**
   * Generating a SLUG string that contains a post.id and a "normalized" post title
   * 
   * "normalized title" means that any sequence of non-alpabetical symbol will be replaced with "_"
   * 
   * @param post The Post object for which we generating the SLUG
   * @returns a SLUG string to use in URL
   */
  const getPostSlug = (post: Post) => `${post.id}-${post.title.toLocaleLowerCase().replace(/[^\p{L}]+/gu, ' ').trim().replace(/\s+/g, '_')}`;
  
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
        <div className="post-item" key={`${idx}_${post.id}`}>
          <Typography variant="h4"><Link to={`/posts/${getPostSlug(post)}`} className="post-item-link">{post.title}</Link></Typography>

          <Typography className="post-date-author"><em>{post.created_at} by <Link to={`/?author=${post.author.username}`}>{post.author.username}</Link></em></Typography>

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
        </div>
      ))}
    </Grid>
  );
}
