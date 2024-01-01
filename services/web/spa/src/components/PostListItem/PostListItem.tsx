import * as React from "react";
import Markdown from "../Markdown";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Link, useSearchParams } from "react-router-dom";
import { Post } from "../../store/slices/posts";
import "./PostListItem.css";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getPostSlug } from "../../helpers/navigation";
import Box from "@mui/material/Box";

export interface PostListItemProp {
  post: Post;
  onDelete: (post: Post) => React.MouseEventHandler<HTMLElement>;
}

interface FilterByParams {
  tag?: string;
  author?: string;
}

export default function PostListItem(props: PostListItemProp) {
  const { post, onDelete } = props;
  const [searchParam, setSearchParam] = useSearchParams();

  // TODO: show filter options with clear icon?
  const addFilterBy: (
    param: FilterByParams
  ) => (evt: React.MouseEvent) => void = (param) => {
    return (evt: React.MouseEvent) => {
      evt.preventDefault();

      // Clear
      searchParam.delete("page");
      searchParam.delete("author");
      searchParam.delete("tag");
      if (param.tag) {
        searchParam.set("tag", param.tag);
      }
      if (param.author) {
        searchParam.set("author", param.author);
      }
      setSearchParam(searchParam);
    };
  };

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
      className="post-item"
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

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box sx={{ flexGrow: 1 }}>
          {post.tags.map((tag) => (
            <Chip
              key={`${post.id}_${encodeURIComponent(tag)}`}
              className="tag"
              label={tag}
              component="a"
              href={`/?${generateLinkFor("tag", tag)}`}
              onClick={addFilterBy({ tag })}
              clickable
            />
          ))}
        </Box>
        <Box sx={{ alignSelf: "flex-start", minWidth: "80px" }}>
          <IconButton aria-label="delete" onClick={onDelete(post)}>
            <DeleteIcon />
          </IconButton>
          <Link aria-label="edit" to={`/posts/${getPostSlug(post)}/edit`}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}
