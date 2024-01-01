import * as React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { Post } from "../../store/slices/posts";
import { getPostSlug } from "../../helpers/navigation";

import "./PostFooter.css";

export interface PostFooterProp {
  post: Post;
  onDelete: (post: Post) => React.MouseEventHandler<HTMLElement>;
}

type HandleChipClickType = (tag: string) => (evt: React.MouseEvent) => void;

/**
 * Renders the post item footer content with tag list
 * and optional post action buttons
 *
 */
export default function PostFooter(props: PostFooterProp) {
  const { post, onDelete } = props;
  const navigate = useNavigate();

  const handleTagClick: HandleChipClickType = (tag) => {
    return (evt: React.MouseEvent) => {
      evt.preventDefault();

      navigate(`/?tag=${encodeURIComponent(tag)}`);
    };
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Box sx={{ flexGrow: 1 }}>
        {post.tags.map((tag) => (
          <Chip
            key={`${post.id}_${encodeURIComponent(tag)}`}
            className="tag"
            label={tag}
            component="a"
            href={`/?tag=${encodeURIComponent(tag)}`}
            onClick={handleTagClick(tag)}
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
  );
}
