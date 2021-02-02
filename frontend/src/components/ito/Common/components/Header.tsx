import React from 'react';
import { Box, Divider, Grid, Typography } from '@material-ui/core';
import BackButton, { BackButtonProps } from './BackButton';
import { SingleUser } from 'common-types';

export interface HeaderProps extends BackButtonProps {
  user: SingleUser
}

const Header = (props: HeaderProps) => {
  const {
    user,
  } = props;

  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          <BackButton {...props} />
        </Grid>
        <Grid xs={10} style={{
          textAlign: 'center',
        }}>
          <Typography variant={'h4'}>
            {'Ito Online'}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Box>
        {`Id: ${user.id} / `}
        {`Name: ${user.name}`}
      </Box>
    </Box>
  );
};

export default Header;