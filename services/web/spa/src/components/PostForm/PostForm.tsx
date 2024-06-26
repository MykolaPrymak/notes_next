import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { Post } from "../../store/slices/posts";
import TagInput from "./TagInput";
import AlertTitle from "@mui/material/AlertTitle";
import { PostBody } from "../../store/slices/post";

export interface PostFormProps {
  post: Post | PostBody;
  title?: string;
  submitBtnLabel?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: (event: React.MouseEvent<HTMLElement>) => void;
  disabled: boolean;
  error?: string | null;
  validation?: any;
}

export const PostForm: React.FC<PostFormProps> = (props) => {
  const { post, title, submitBtnLabel, onSubmit, onCancel } = props;
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }}
      >
        {props?.error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {props.error}
          </Alert>
        )}
        <TextField
          autoFocus
          required
          fullWidth
          margin="normal"
          inputMode="numeric"
          id="title"
          label="Title"
          name="title"
          type="text"
          defaultValue={post.title}
          disabled={props.disabled}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="body"
          label="Post content"
          name="body"
          type="text"
          multiline
          minRows={15}
          defaultValue={post.body}
          disabled={props.disabled}
        />

        <TagInput
          key={post.id}
          name="tags"
          tags={post.tags}
          disabled={props.disabled}
        />

        <FormControlLabel
          control={
            <Switch
              disabled={props.disabled}
              name="private"
              id="private"
              defaultChecked={post.private}
            />
          }
          label="Private"
        />

        <Box sx={{ mt: 3, mb: props.disabled ? 0 : 2 }}>
          <Button
            variant="contained"
            disabled={props.disabled}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={props.disabled}
            sx={{ ml: 3 }}
            endIcon={props.disabled && <CircularProgress size={20} />}
          >
            {submitBtnLabel || "Submit"}
          </Button>
        </Box>
        {props.disabled && <LinearProgress sx={{ maxWidth: "md", mb: 2 }} />}
      </Box>
    </Box>
  );
};

export default PostForm;
