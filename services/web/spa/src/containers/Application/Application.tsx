import React, { useEffect } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import "./application.css";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Blog from "../Blog/Blog";
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
  <Container maxWidth="lg">
    {!hideHeader &&<Header title="Notes" sections={sections} />}
    <Box sx={{ my: 4 }}>
      {children}
      <Outlet />
    </Box>
    <Footer
      title="Footer"
      description="Something here to give the footer a purpose!"
    />
  </Container>
</>;

const Application: React.FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('dispatch(fetchMeInfo());');

    const loadResult = dispatch(fetchMeInfo());

    return () => {
      loadResult.abort();
    }
  }, [])
  return (
    <BrowserRouter  >
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Root hideHeader={true}><Login /></Root>} />
        <Route path="/logout" element={<Root hideHeader={true}><Logout /></Root>} />
        <Route path="/*" element={<Root><p>Not found</p></Root>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
