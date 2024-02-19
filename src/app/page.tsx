'use client'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home(): React.ReactElement {
  return (
    <div>
      <AppBar position="static" color="transparent" elevation={2}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Link href="/login">Login</Link>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to AUS Exchange Program Portal
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to the AUS Exchange Program Portal.
        </Typography>
      </Container>
    </div>
  );


}
