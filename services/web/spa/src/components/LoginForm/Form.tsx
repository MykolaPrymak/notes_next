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
import PasswordInput from "../PasswordInput";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

export interface LoginFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
  error?: string | null;
  validation?: any;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={props.onSubmit} noValidate sx={{ mt: 1 }}>
        {props?.error && <Alert severity="error">{props.error}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Email Address"
          name="username"
          type="email"
          autoComplete="email"
          autoFocus
        />
        <PasswordInput />
        {/*
          <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          />
        */}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={props.disabled}
          sx={{ mt: 3, mb: props.disabled ? 0 : 2 }}
        >
          Sign In
        </Button>
        {props.disabled && <LinearProgress sx={{maxWidth: "md", mb: 2}} />}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default LoginForm;
