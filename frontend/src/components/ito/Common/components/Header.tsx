import React from 'react';
import { Box, Divider, Grid, Typography } from '@material-ui/core';
import BackButton, { BackButtonProps } from './BackButton';
import { SingleUser } from 'common-types';
import useCheckIsRoomPage from 'lib/custom-hooks/useCheckIsRoomPage';

export interface HeaderProps extends BackButtonProps {
  user: SingleUser
}

const Header = (props: HeaderProps) => {
  const {
    user,
  } = props;
  const { isRoomPage, } = useCheckIsRoomPage();

  return (
    <Box>
      <Grid container>
        <Grid item xs={2}>
          {!isRoomPage && (
            <BackButton {...props} />
          )}
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