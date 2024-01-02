import * as React from "react";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Post } from "../../store/slices/posts";
import { getPostSlug } from "../../helpers/navigation";
import "./PostHeader.css";

interface PostHeaderTitleContentProps {
  post: Post;
}

const PostHeaderTitleContent: React.FC<PostHeaderTitleContentProps> = ({
  post,
}) => {
  return (
    <>
      {post.private && (
        <Tooltip
          title="Private post"
          aria-label="Private post"
          className="post-private"
          sx={{ mr: 1 }}
        >
          <ShieldOutlinedIcon color="info" />
        </Tooltip>
      )}
      {post.title}
    </>
  );
};

interface PostHeaderTitleProps {
  post: Post;
  detailPage?: boolean;
}

const PostHeaderTitle: React.FC<PostHeaderTitleProps> = ({
  post,
  detailPage,
}) => {
  return (
    <Typography variant="h4" className="post-title">
      {detailPage ? (
        <PostHeaderTitleContent post={post} />
      ) : (
        <Link to={`/posts/${getPostSlug(post)}`} className="post-item-link">
          <PostHeaderTitleContent post={post} />
        </Link>
      )}
    </Typography>
  );
};

export interface PostHeaderProp {
  post: Post;
  detailPage?: boolean;
}

export default function PostHeader(props: PostHeaderProp) {
  const { post, detailPage } = props;

  return (
    <>
      <PostHeaderTitle post={post} detailPage={detailPage} />

      <Typography className="post-date-author">
        <em>
          {post.created_at} by{" "}
          <Link to={`/?author=${encodeURIComponent(post.author.username)}`}>
            {post.author.username}
          </Link>
        </em>
      </Typography>
    </>
  );
}
