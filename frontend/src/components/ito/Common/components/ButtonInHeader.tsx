import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';

export interface ButtonInHeaderProps extends BoxProps {
  
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: '#eee',
    }
  }
}));

const ButtonInHeader = (props: ButtonInHeaderProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} {...props}>
      {props.children}
    </Box>
  );
};

export default ButtonInHeader;