import * as React from "react";
import Paper from "@mui/material/Paper";
import { Post } from "../../store/slices/posts";
import Markdown from "../Markdown";
import PostHeader from "../PostHeader";
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
      <PostHeader post={post} detailPage={true} />

      <Markdown className="markdown">{post.body}</Markdown>

      <PostFooter post={post} isEditable={isEditable} onDelete={onDelete} />
    </Paper>
  );
}
