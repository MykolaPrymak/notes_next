import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import Header from '../../components/Header';
// import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

// import MainFeaturedPost from '../../components/FeaturedPosts/MainFeaturedPost';
// import FeaturedPost from '../../components/FeaturedPosts/FeaturedPost';
import PostsList from '../../components/PostsList';


// Redux
import { fetchPosts, resetPosts, selectPosts, isLoadingPosts } from '../../store/slices/posts'
import { useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { Button, Skeleton } from '@mui/material';
import { LocalFireDepartment } from '@mui/icons-material';

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

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random/?blog/',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?blog/',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?blog/',
    imageLabel: 'Image Text',
  },
];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const SkeletonPost: React.FC = () => (
  <>
  <Grid
      item
      xs={12}
      >

    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} />
    <Skeleton variant="rectangular" height={250} />
      </Grid>
  </>
);

export default function Blog() {
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts)
  const isLoading = useSelector(isLoadingPosts)

  // Load post at component load
  useEffect(() => {
    console.log('dispatch(fetchPosts());');

    const loadResult = dispatch(fetchPosts());

    return () => {
      loadResult.abort();
    }
  }, [])

  return (
    <>
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
          {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
          {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))} 
          </Grid> */}

          <Grid container spacing={1} sx={{ mt: 3 }}>
            <PostsList title="From the firehose" posts={posts} />
            {isLoading && <SkeletonPost />}
            {/* <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            /> */}
            {!isLoading && <Button onClick={() => dispatch(fetchPosts())}>Load more</Button>}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
}
