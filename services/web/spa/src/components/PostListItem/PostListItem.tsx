import * as React from "react";
import Markdown from "../Markdown";
import Typography from "@mui/material/Typography";
import { Link, useSearchParams } from "react-router-dom";
import { Post } from "../../store/slices/posts";
import "./PostListItem.css";
import Paper from "@mui/material/Paper";
import { getPostSlug } from "../../helpers/navigation";
import PostFooter from "../PostFooter";

export interface PostListItemProp {
  post: Post;
  onDelete: (post: Post) => React.MouseEventHandler<HTMLElement>;
}

export default function PostListItem(props: PostListItemProp) {
  const { post, onDelete } = props;
  const [searchParam, setSearchParam] = useSearchParams();

  // TODO: show filter options with clear icon?
  const generateLinkFor: (
    searchKey: string,
    searchValue: string | undefined
  ) => string = (searchKey, searchValue) => {
    searchParam.delete("page");
    searchParam.delete("author");
    searchParam.delete("tag");
    if (searchValue) {
      searchParam.set(searchKey, searchValue);
    } else {
      searchParam.delete(searchKey);
    }

    return searchParam.toString();
  };

  return (
    <Paper
      className="post post-item"
      elevation={1}
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Typography variant="h4" className="post-title">
        <Link to={`/posts/${getPostSlug(post)}`} className="post-item-link">
          {post.title}
        </Link>
      </Typography>

      <Typography className="post-date-author">
        <em>
          {post.created_at} by{" "}
          <Link to={`/?${generateLinkFor("author", post.author.username)}`}>
            {post.author.username}
          </Link>
        </em>
      </Typography>

      <Markdown className="markdown clipped">{post.body}</Markdown>

      <PostFooter post={post} onDelete={onDelete} />
    </Paper>
  );
}
