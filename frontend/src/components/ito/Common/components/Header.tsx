import React from 'react';
import { Box, Divider, Grid, Typography } from '@material-ui/core';
import BackButton, { BackButtonProps } from './BackButton';

export interface HeaderProps extends BackButtonProps {
  
}

const Header = (props: HeaderProps) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          <BackButton {...props} />
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