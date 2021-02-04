import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { FailSuccessResultProps } from './types';

const FailSuccessResult = (props: FailSuccessResultProps) => {
  return (
    <Box textAlign={'center'}>
      <Typography variant={'h5'}>
        {props.nextCardNumber}
        {props.result === 'SUCCESS' ? '<' : '>'}
        {props.prevCardNumber}
      </Typography>
      <Typography variant={'h4'}>{props.result}</Typography>              
    </Box>
  );
};

export default FailSuccessResult;