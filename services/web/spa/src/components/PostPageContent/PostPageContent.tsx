import * as React from "react";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Post } from "../../store/slices/posts";
import Markdown from "../Markdown";
import PostFooter from "../PostFooter";
import "./PostPageContent.css";

export interface PostPageContentProp {
  post: Post;
  isEditable: boolean;
  onDelete: (post: Post) => React.MouseEventHandler<HTMLElement>;
}

export default function PostPageContent(props: PostPageContentProp) {
  const { post, isEditable, onDelete } = props;
  return (
    <Paper
      className="post"
      sx={{
        p: 3,
        "& .post-date-author": { mb: 2, fontStyle: "italic" },
        "& .markdown": {
          display: "block", // TODO: Use container to show markdown box shadow
          pt: 0,
          pb: 1,
          mb: 2,
          overflow: "auto",
        },
      }}
    >
      <Typography variant="h4" className="post-title">
      {post.private && (
            <Tooltip title="Private post" aria-label="Private post" className="post-private" sx={{mr: 1}}>
              <ShieldOutlinedIcon color="info" />
            </Tooltip>
          )}
        {post.title}
      </Typography>

      <Typography className="post-date-author">
        <em>
          {post.created_at} by{" "}
          <Link to={`/?author=${encodeURIComponent(post.author.username)}`}>
            {post.author.username}
          </Link>
        </em>
      </Typography>

      <Markdown className="markdown">{post.body}</Markdown>

      <PostFooter post={post} isEditable={isEditable} onDelete={onDelete} />
    </Paper>
  );
}
