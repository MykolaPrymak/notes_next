import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  PostBody,
  resetPost,
  getPostRequestError,
  isPostCreating,
  createPost,
} from "../../store/slices/post";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { Post } from "../../store/slices/posts";
import Box from "@mui/material/Box";
import PostForm from "../../components/PostForm";
import { getPostSlug } from "../../helpers/navigation";
import { API_RESPONSE_BODY } from "../../helpers/api";

export default function PostCreateContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCreating = useSelector(isPostCreating);
  const postRequestError = useSelector(getPostRequestError);

  const postTemplate: PostBody = {
    title: "",
    body: "",
    tags: [],
    private: false,
  };

  // reset post state
  React.useEffect(() => {
    dispatch(resetPost());

    return () => {
      dispatch(resetPost());
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const postUpooadPayload: PostBody = {
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      tags: formData.getAll("tags[]") as string[],
      private: formData.get("private") !== null,
    };

    const createAction = dispatch(createPost(postUpooadPayload));

    createAction.then((res) => {
      const apiPayload = res.payload as API_RESPONSE_BODY<Post>;
      if (apiPayload.ok) {
        navigate(`/posts/${getPostSlug(apiPayload.body)}`);
      }
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box width="100%">
      <PostForm
        post={postTemplate}
        title="Create a new post"
        submitBtnLabel="Create"
        error={postRequestError}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        disabled={isCreating}
      />
    </Box>
  );
}
