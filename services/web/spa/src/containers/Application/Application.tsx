import React from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import "./application.css";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Blog from "../Blog/Blog";

const Root: React.FC<Record<string, never>> = () => <>
  <Container maxWidth="sm">

    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <Link to="/">
          React Application
        </Link>
        <Link to="/page_a"> | Page A</Link>
        <Link to="/page_b"> | Page B</Link>
        <Link to="/blog"> | Blog</Link>


        <Outlet />
      </Typography>
    </Box>
  </Container>

</>;

const Application: React.FC<Record<string, never>> = () => {
  return (
    <BrowserRouter  >
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="page_a" element={<p>Page A Content</p>} />
          <Route path="page_b" element={<p>Page B Content</p>} />
        </Route>
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
