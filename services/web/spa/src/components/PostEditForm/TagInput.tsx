import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";
import { Post } from "../../store/slices/posts";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export interface TagAddDialogProps {
  open: boolean;
  onClose?: () => void;
  onSubmit: (tags:string) => void;
}

export const TagAddDialog: React.FC<TagAddDialogProps> = (props) => {
  const {open, onClose, onSubmit} = props;

  const handleSubmit:React.FormEventHandler<HTMLFormElement> = (evt) => {
    const data = new FormData(evt.currentTarget);
    const tag = data.get('tag') as string;

    onSubmit(tag);
  }

  return (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Add tag(s)</DialogTitle>
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText>
          Type new tag(s) name. Use space as tag separator.
        </DialogContentText>

        <TextField
          autoFocus
          autoComplete="off"
          margin="dense"
          id="tag"
          name="tag"
          label="Tag(s)"
          type="text"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">Add</Button>
      </DialogActions>
    </form>
  </Dialog>
  );
};

export interface TagInputProps {
  name: string;
  tags: string[];
  disabled: boolean;
}

export const TagInput: React.FC<TagInputProps> = (props) => {
  const {name, disabled} = props;
  const [tags, setTags] = React.useState<string[]>(props.tags);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleDeleteTag = (tag: string) => () => {
    setTags(tags.filter((val) => val !== tag));
  };

  const addTag = (tag: string) => {
    const new_tags = tag.split(' ').map(tag => tag.trim().toLocaleLowerCase()).filter(tag => tag.length > 0 && !tags.includes(tag));
    if (new_tags.length > 0) {
      setTags([...tags, ...new_tags]);
    }

    setDialogOpen(false);
  };

  const openAddTagDialog = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          display: "inline-flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "left",
          flexWrap: "wrap",
          listStyle: "none",
          width: "100%",
          p: 0.5,
          mt: 2,
          mb: 1,
        }}
        component="ul"
      >
        <InputLabel
          htmlFor="add-tag"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top left",
            transform: "translate(14px, -9px) scale(0.75)",
            bgcolor: "background.paper",
            pl: 1,
            ml: -1,
            pr: 1,
          }}
        >
          Tags
        </InputLabel>

        {tags.map((tag, idx) => (
          <ListItem key={tag}>
            <Chip label={tag} onDelete={disabled ? undefined : handleDeleteTag(tag)} />
            <input type="hidden" name={`${name}[]`} id={`tag_${idx}`} value={tag} />
          </ListItem>
        ))}
        <IconButton
          onClick={openAddTagDialog}
          disabled={disabled}
          aria-label="add tag"
          id="add-tag"
          color="success"
        >
          <AddCircleIcon />
        </IconButton>
      </Paper>
      <TagAddDialog open={dialogOpen} onSubmit={addTag} onClose={() => setDialogOpen(false)} />
    </>
  );
};
