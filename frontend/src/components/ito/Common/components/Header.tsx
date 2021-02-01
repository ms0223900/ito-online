import React from 'react';
import { Box, Divider, Grid, Typography } from '@material-ui/core';
import BackButton from './BackButton';

const Header = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          <BackButton />
        </Grid>
        <Grid xs={10}>
          <Typography variant={'h4'}>
            {'Ito Online'}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Header;