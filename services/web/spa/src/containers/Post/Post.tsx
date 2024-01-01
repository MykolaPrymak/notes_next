import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPost,
  isLoadingPost,
  selectPost,
  resetPost,
  deletePost,
} from "../../store/slices/post";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import PostSkeleton from "../../components/PostSkeleton";
import PostPageContent from "../../components/PostPageContent";
import { Post } from "../../store/slices/posts";
import Box from "@mui/material/Box";
import PostDeleteConfirmationDialog from "../../components/PostDeleteConfirmationDialog";
import { getMeInfo } from "../../store/slices/auth";

export default function PostContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const post = useSelector(selectPost);
  const me = useSelector(getMeInfo);

  const isLoading = useSelector(isLoadingPost);
  const { postSlug } = useParams();
  const [isDeleteAlerShown, setDeleteAlerShown] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const postId = String(postSlug?.split("-").shift());

  const onPostDelete: (post: Post) => React.MouseEventHandler<HTMLElement> =
    (post: Post) => (evt) => {
      evt.preventDefault();
      setPostToDelete(post);
      setDeleteAlerShown(true);
    };

  const onDeleteConfirmationClose = () => {
    setDeleteAlerShown(false);
    setPostToDelete(null);
  };

  const handlePostDelete: React.MouseEventHandler<HTMLElement> = (evt) => {
    evt.preventDefault();
    if (postToDelete) {
      dispatch(deletePost(postToDelete.id)).then(() => {
        navigate("/");
        onDeleteConfirmationClose();
      });
    }
  };

  React.useEffect(() => {
    const thunkAction = dispatch(fetchPost(postId));

    return () => {
      dispatch(resetPost());
      thunkAction.abort();
    };
  }, [postId]);

  return (
    <Box maxWidth="lg">
      {isLoading && <PostSkeleton />}
      {!isLoading && (
        <PostPageContent post={post as Post} isEditable={post.author.id === me?.id} onDelete={onPostDelete} />
      )}
      <PostDeleteConfirmationDialog
        post={postToDelete}
        isOpen={isDeleteAlerShown}
        onClose={onDeleteConfirmationClose}
        onConfirm={handlePostDelete}
      />
    </Box>
  );
}
