"use client";
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ gap: 3 }}>
        <Image width={50} height={50}src='/eternal-logo.png' />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Eternal Place Memorial Park
        </Typography>
        <Link href='/login'>Login</Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;