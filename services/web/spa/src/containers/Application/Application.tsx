import React, { useEffect } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import "./application.css";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Notifications from "../Notifications";
import Blog from "../Blog";
import Post from "../Post";
import PostEdit from "../PostEdit";
import PostCreate from "../PostCreate";
import Login from "../Login";
import Logout from "../Logout";

import { fetchMeInfo } from '../../store/slices/auth'
import { useAppDispatch } from '../../store'

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const Root: React.FC<{ children: React.ReactNode, hideHeader?: boolean }> = ({ children, hideHeader = false }) => <>
  <Container maxWidth="lg" sx={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }}>
    {!hideHeader && <Header title="Notes" sections={sections} />}
    <Box sx={{ my: 4 }}>
      {children}
      <Outlet />
    </Box>
    <Footer
      title="Footer"
      description="Something here to give the footer a purpose!"
    />
    <Notifications />
  </Container>
</>;

const Application: React.FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const thunkAction = dispatch(fetchMeInfo());

    return () => {
      thunkAction.abort();
    }
  }, []);

  return (
    <BrowserRouter  >
      <Routes>
        <Route path="/" element={<Root><Blog /></Root>} />
        <Route path="/posts/:postSlug" element={<Root><Post /></Root>} />
        <Route path="/posts/:postSlug/edit" element={<Root><PostEdit /></Root>} />
        <Route path="/posts/new" element={<Root><PostCreate /></Root>} />
        <Route path="/login" element={<Root hideHeader={true}><Login /></Root>} />
        <Route path="/logout" element={<Root hideHeader={true}><Logout /></Root>} />
        <Route path="/search" element={<Root hideHeader={true}><p>Search</p></Root>} />
        <Route path="/*" element={<Root><p>Not found</p></Root>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
