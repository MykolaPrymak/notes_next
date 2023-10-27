import React from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import "./application.css";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Blog from "../Blog/Blog";

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

const Root: React.FC<{children: React.ReactNode}> = ({children}) => <>
  <Container maxWidth="lg">
    <Header title="Notes" sections={sections} />
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <Link to="/">
          React Application
        </Link>
      </Typography>
    <Outlet />
    {children}
    </Box>
    <Footer
      title="Footer"
      description="Something here to give the footer a purpose!"
    />
  </Container>
</>;

const Application: React.FC<Record<string, never>> = () => {
  return (
    <BrowserRouter  >
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/login" element={<Root><p>Login</p></Root>} />
        <Route path="/logout" element={<Root><p>logout</p></Root>} />
        <Route path="/*" element={<Root><p>Not found</p></Root>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
