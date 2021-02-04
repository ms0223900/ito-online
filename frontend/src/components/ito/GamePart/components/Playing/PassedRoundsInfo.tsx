import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PassedRoundsInfoProps } from './types';

const PassedRoundsInfo = ({
  passedRounds,
}: PassedRoundsInfoProps) => {
  return (
    <Box paddingY={1}>
      <Typography variant={'h5'} color={'primary'}>
        {`Passed rounds: ${passedRounds}`}
      </Typography>
    </Box>
  );
};

export default PassedRoundsInfo;