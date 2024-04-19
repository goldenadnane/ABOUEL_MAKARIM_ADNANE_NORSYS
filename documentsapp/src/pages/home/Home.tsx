import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useAuth } from 'react-oidc-context';
export const Home = () => {
  const auth = useAuth()
  
 
 
  return (
    <>
      <Typography variant="h3">Home</Typography>
    </>
  );
};
