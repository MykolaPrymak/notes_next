import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';

import Header from '../../components/Header';
// import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

// import MainFeaturedPost from '../../components/FeaturedPosts/MainFeaturedPost';
// import FeaturedPost from '../../components/FeaturedPosts/FeaturedPost';
import PostsList from '../../components/PostsList';


// Redux
import { fetchPosts, selectPosts, isLoadingPosts, POST_API_ARG_NAMES, selectTotalPostCount } from '../../store/slices/posts'
import { useAppDispatch } from '../../store'
import { ApiArgumentDescription, process_url_search_params } from '../../helpers/api';
import PostSkeleton from '../../components/PostSkeleton';

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

/*
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
*/


export default function Blog() {
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);
  const totalPostCount = useSelector(selectTotalPostCount);
  const isLoading = useSelector(isLoadingPosts);
  const [searchParam, setSearchParam] = useSearchParams();

  const setFilterBy = useCallback((key: string, value: string) => {
    searchParam.set(key, value);
    searchParam.delete("page");
    setSearchParam(searchParam);
  }, [searchParam.toString()]);


  const onPageChange = (evt: React.ChangeEvent<any>, page: number) => {
    evt.preventDefault();
    if (page > 1) {
      searchParam.set("page", String(page));
    } else {
      searchParam.delete("page");
    }
    setSearchParam(searchParam);

    // Scroll to top if user change page with pagination
    /*
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    */
  }
  const api_args: ApiArgumentDescription<POST_API_ARG_NAMES>[] = [
    {
      key: "page",
      defaultValue: 1,
      type: "number"
    },
    {
      key: "limit",
      defaultValue: 5,
      type: "number"
    },
    {
      key: "tag",
      defaultValue: null,
      type: "string"
    },
    {
      key: "author",
      defaultValue: null,
      type: "string"
    },
  ];

  const queryParam = process_url_search_params<POST_API_ARG_NAMES>(searchParam, api_args);
  const currentPage = Number(queryParam.get("page")) || 1;
  const postPerPage = Number(queryParam.get("limit"));
  const totalPages = Math.ceil(totalPostCount / postPerPage) || 1;

  // Load post at component load
  useEffect(() => {
    console.log('dispatch(fetchPosts());');

    const loadResult = dispatch(fetchPosts(process_url_search_params<POST_API_ARG_NAMES>(searchParam, api_args)));

    return () => {
      loadResult.abort();
    }
  }, [searchParam.toString()]);

  // Load post at component load
  useEffect(() => {
    console.log('dispatch(fetchPosts());');

    const loadResult = dispatch(fetchPosts(process_url_search_params<POST_API_ARG_NAMES>(searchParam, api_args)));

    return () => {
      loadResult.abort();
    }
  }, [totalPostCount]);

  return (
    <main>
      {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
      {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))} 
          </Grid> */}

      <Grid container spacing={1} sx={{ mt: 3 }}>
        <PostsList posts={posts} filterBy={setFilterBy} />
        {isLoading && <PostSkeleton times={postPerPage} />}
        {/* <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            /> */}
        {/* <Grid item>
            {!isLoading && <Button onClick={() => dispatch(fetchPosts(searchParam))}>Load more</Button>}
            </Grid> */}
        {(!isLoading && totalPages > 1) && <Grid item>
          <Pagination count={totalPages} page={currentPage} onChange={onPageChange} size="large" shape="rounded" />
        </Grid>
        }
      </Grid>
    </main>
  );
}
