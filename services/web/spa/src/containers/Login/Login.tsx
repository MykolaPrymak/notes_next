import * as React from 'react';
import Container from '@mui/material/Container';

import SignInForm from "../../components/LoginForm";

import { loginUser, resetLoginError, isLoginInProgress, getLoginError } from '../../store/slices/auth'
import { useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'


export default function SignIn() {
  // reset
  const dispatch = useAppDispatch();
  const isLoading = useSelector(isLoginInProgress);
  const loginError = useSelector(getLoginError);

  React.useEffect(() => {
    dispatch(resetLoginError())
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataJSON = {
      username: data.get('username') as string,
      password: data.get('password') as string,
    };

    const loadResult = dispatch(loginUser(dataJSON));

    return () => {
      loadResult.abort();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <SignInForm onSubmit={handleSubmit} error={loginError} disabled={isLoading} />
    </Container>
  );
}
