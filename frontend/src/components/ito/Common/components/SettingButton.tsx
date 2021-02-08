import React from 'react';
import { Box, Fab, makeStyles } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { Callback } from 'common-types';

export interface SettingButtonProps {
  onToggleSetting: Callback
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#eee',
    }
  }
}));

const SettingButton = (props: SettingButtonProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} onClick={props.onToggleSetting}>
      <Settings />
    </Box>
  );
};

export default SettingButton;