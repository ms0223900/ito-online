import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

export interface LoadingAndErrorProps {
  loading?: boolean
  error?: any | undefined
}

const LoadingAndError = (props: LoadingAndErrorProps) => {
  const { loading, error } = props;

  if(loading) return (
    <Box textAlign={'center'}>
      <CircularProgress />
    </Box>
  );

  if(error) return (
    <Typography>
      {error.message}
    </Typography>
  );
  
  return null;
};

export default LoadingAndError;