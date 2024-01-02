import * as React from "react";
import Markdown from "../Markdown";
import { useSearchParams } from "react-router-dom";
import { Post } from "../../store/slices/posts";
import "./PostListItem.css";
import Paper from "@mui/material/Paper";
import PostFooter from "../PostFooter";
import PostHeader from "../PostHeader";

export interface PostListItemProp {
  post: Post;
  isEditable: boolean;
  onDelete: (post: Post) => React.MouseEventHandler<HTMLElement>;
}

export default function PostListItem(props: PostListItemProp) {
  const { post, isEditable, onDelete } = props;
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
      <PostHeader post={post} />

      <Markdown className="markdown clipped">{post.body}</Markdown>

      <PostFooter post={post} isEditable={isEditable} onDelete={onDelete} />
    </Paper>
  );
}
