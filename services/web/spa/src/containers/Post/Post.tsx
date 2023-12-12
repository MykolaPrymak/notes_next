import * as React from 'react';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

// import { loginUser, resetLoginError, isLoginInProgress, getLoginError } from '../../store/slices/auth'
// import { useAppDispatch } from '../../store'
// import { useSelector } from 'react-redux'


export default function Post() {
  // reset
  const { postSlug } = useParams();

  return (
    <Container component="main" maxWidth="xs">
      <Typography>{postSlug}</Typography>
    </Container>
  );
}
