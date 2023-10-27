import React from 'react';
import { useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import "./Header.css";

export interface HeaderProps {
  sections: ReadonlyArray<SectionItem>;
  title: string;
}

interface SectionItem {
  title: string;
  url: string;
}
interface SectionsProps {
  items: ReadonlyArray<SectionItem>
}

const Sections: React.FC<SectionsProps> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Toolbar
      component="nav"
      variant="dense"
      sx={{ justifyContent: 'space-between', overflowX: 'auto', borderBottom: 1, borderColor: 'divider' }}
    >
      {items.map((section) => (
        <Link
          color="inherit"
          noWrap
          key={section.title}
          variant="body2"
          href={section.url}
          sx={{ p: 1, flexShrink: 0 }}
        >
          {section.title}
        </Link>
      ))}
    </Toolbar>
  );
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* <Button size="small">Subscribe</Button> */}
        <Typography
          component="a"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
          href="/"
          onClick={(evt: React.MouseEvent) => {
            evt.preventDefault();
            navigate("/");
          }}
        >
          {title}
        </Typography>

        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
        {/* <Button variant="outlined" size="small" onClick={() => navigate("/register")}>
          Sign up
        </Button> */}
        <Button variant="outlined" size="small" id="login-btn" onClick={() => navigate("/login")}>
          Sign in
        </Button>
      </Toolbar>
      <Sections items={sections}/>

    </React.Fragment>
  );
}
