import React from 'react';
import { useNavigate, NavigateFunction } from "react-router-dom";
import Button from '@mui/material/Button';

import { useSelector } from 'react-redux'
import { getMeInfo, isLoadingMeInfo } from '../../store/slices/auth'
import "./AuthSection.css";

export interface AuthSectionProps {
}

interface ComponentWithNavigationProps {
  navigate: NavigateFunction;
}

const LoginBtn: React.FC<ComponentWithNavigationProps> = ({navigate}) => {
return <Button variant="outlined" size="small" id="login-btn" onClick={() => navigate("/login")}>
        Sign in
      </Button>
};

const LogoutBtn: React.FC<ComponentWithNavigationProps> = ({navigate}) => {
return <Button variant="outlined" size="small" id="login-btn" onClick={() => navigate("/logout")}>
        Sign out
      </Button>
};

export default function AuthSection(props: AuthSectionProps) {
  //const { sections, title } = props;
  const navigate = useNavigate();
  const me = useSelector(getMeInfo);
  const isAuthInfoLoading = useSelector(isLoadingMeInfo);
  const isUserAuthenticated = me !== null;

  console.log('AuthSection', {me, isAuthInfoLoading, isUserAuthenticated})

  if (isAuthInfoLoading) {
    return null;
  }

  return (
    <React.Fragment>
      {/* <Button variant="outlined" size="small" onClick={() => navigate("/register")}>
        Sign up
      </Button> */}

      {isUserAuthenticated ?
      <LogoutBtn navigate={navigate} />: <LoginBtn navigate={navigate} />
      }
    </React.Fragment>
  );
}
