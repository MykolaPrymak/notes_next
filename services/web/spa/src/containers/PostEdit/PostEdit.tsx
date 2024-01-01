import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPost,
  updatePost,
  isLoadingPost,
  selectPost,
  PostBody,
  isPostUpdating,
  resetPost,
  getPostRequestError,
  isPostLoadError,
  isPostLoaded,
  // isPostUpdatedError,
} from "../../store/slices/post";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import PostSkeleton from "../../components/PostSkeleton";
import { Post } from "../../store/slices/posts";
import Box from "@mui/material/Box";
import PostForm from "../../components/PostForm";
import { getPostSlug } from "../../helpers/navigation";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AlertTitle from "@mui/material/AlertTitle";
import { API_RESPONSE_BODY } from "../../helpers/api";

export default function PostEditContainer() {
  // reset
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const post = useSelector(selectPost);
  const isLoading = useSelector(isLoadingPost);
  const isLoaded = useSelector(isPostLoaded);

  const isLoadError = useSelector(isPostLoadError);
  const isUpdating = useSelector(isPostUpdating);
  // const isUpdateError = useSelector(isPostUpdatedError);
  const postRequestError = useSelector(getPostRequestError);
  const { postSlug } = useParams();
  const postId = String(postSlug?.split("-").shift());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const postUpooadPayload: PostBody = {
      id: postId,
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      tags: formData.getAll("tags[]") as string[],
      private: formData.get("private") !== null,
    };

    const updateAction = dispatch(updatePost(postUpooadPayload));

    updateAction.then((res) => {
      const apiPayload = res.payload as API_RESPONSE_BODY<Post>;
      if (apiPayload.ok) {
        navigate(`/posts/${getPostSlug(apiPayload.body)}`);
      }
    });
  };

  const handleCancel = () => {
    navigate(`/posts/${getPostSlug(post as Post)}`);
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
      {isLoadError && (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => dispatch(fetchPost(postId))}
            >
              Try again
            </Button>
          }
        >
          <AlertTitle>Load error</AlertTitle>
          {postRequestError}
        </Alert>
      )}
      {(isLoading || isLoadError) && <PostSkeleton />}
      {isLoaded && (
        <PostForm
          post={post as Post}
          title={`Edit: ${post?.title}`}
          submitBtnLabel="Update"
          error={postRequestError}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          disabled={isUpdating}
        />
      )}
    </Box>
  );
}
