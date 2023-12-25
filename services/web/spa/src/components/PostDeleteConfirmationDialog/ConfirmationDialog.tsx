import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Post } from '../../store/slices/posts';


export interface ConfirmationDialogProps {
  post: Post | null;
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLElement>;
  onConfirm: React.MouseEventHandler<HTMLElement>;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { post, isOpen, onClose, onConfirm } = props;

  return (
    <Dialog
    open={isOpen}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Delete the post?
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure that you want to delete <strong>"{post?.title}"</strong> post? You can't undo this action.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} autoFocus>Cancel</Button>
      <Button variant="contained" onClick={onConfirm} color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  );
}
