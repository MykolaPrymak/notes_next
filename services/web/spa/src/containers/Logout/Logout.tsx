import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PasswordInput from "../../components/PasswordInput";
import Alert from '@mui/material/Alert';

export interface SignInFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
  error?: string | null;
  validation?: any;
}

import { logoutUser, isLogoutInProgress, getLogoutError } from '../../store/slices/auth'
import { useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';

export default function LogoutPage() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(isLogoutInProgress);
  const logoutError = useSelector(getLogoutError);
  
  React.useEffect(() => {
    const thunkAction = dispatch(logoutUser());

    return () => {
      thunkAction.abort();
    }
  }, []);

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: "md",
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Box sx={{ m: 1,  }}>
        {(!isLoading && logoutError) && <>
          <Alert severity="error">{logoutError}</Alert>
          <Button variant="contained" onClick={() => dispatch(logoutUser())}>Try again</Button>
        </>}
        <LinearProgress sx={{maxWidth: "md", minWidth: "200px"}} />
        <br />
        {isLoading && <LinearProgress sx={{maxWidth: "md"}} />}
      </Box>
    </Box>
  );
}
