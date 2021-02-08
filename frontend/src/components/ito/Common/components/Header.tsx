import React from 'react';
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import BackButton, { BackButtonProps } from './BackButton';
import { SingleUser } from 'common-types';
import useCheckIsRoomPage from 'lib/custom-hooks/useCheckIsRoomPage';
import SettingButton, { SettingButtonProps } from './SettingButton';
import HintButton, { HintButtonProps } from './HintButton';

export interface HeaderProps extends BackButtonProps, SettingButtonProps, HintButtonProps {
  user: SingleUser
}

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  backBTN: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  hintBTN: {
    position: 'absolute',
    top: 0,
    right: 40,
    height: '100%',
  },
  settingBTN: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
  },
  userInfo: {
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const Header = (props: HeaderProps) => {
  const {
    user,
  } = props;
  const classes = useStyles();
  const { isRoomPage, } = useCheckIsRoomPage();

  return (
    <Box>
      <Box position={'relative'}>
        <Box className={classes.backBTN}>
          {!isRoomPage && (
            <BackButton {...props} />
          )}
        </Box>
        <Box textAlign={'center'}>
          <Typography variant={'h4'}>
            {'Ito Online'}
          </Typography>
        </Box>
        <Box className={classes.hintBTN}>
          <HintButton {...props} />
        </Box>
        <Box className={classes.settingBTN}>
          <SettingButton {...props} />
        </Box>
      </Box>
      <Divider />
      <Box className={classes.userInfo}>
        {`Id: ${user.id} / `}
        {`Name: ${user.name}`}
      </Box>
    </Box>
  );
};

export default Header;