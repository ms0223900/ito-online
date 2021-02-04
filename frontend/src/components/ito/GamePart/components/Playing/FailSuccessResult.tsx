import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { FailSuccessResultProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#fff',
  }
}));

const FailSuccessResult = (props: FailSuccessResultProps) => {
  const classes = useStyles();

  return (
    <Box textAlign={'center'} className={classes.root}>
      <Typography variant={'h5'}>
        {props.prevCardNumber}
        {props.result === 'SUCCESS' ? '<' : '>'}
        {props.nextCardNumber}
      </Typography>
      <Typography variant={'h4'}>{props.result}</Typography> 
      <Button onClick={props.onConfirmResult}>
        {props.result}
      </Button>             
    </Box>
  );
};

export default FailSuccessResult;