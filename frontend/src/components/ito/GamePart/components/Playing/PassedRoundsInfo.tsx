import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PassedRoundsInfoProps } from './types';
import { useIntl } from 'react-intl';

const PassedRoundsInfo = ({
  passedRounds,
}: PassedRoundsInfoProps) => {
  const { formatMessage, } = useIntl();
  const mes = formatMessage({ id: 'playingPart.passedRoundsInfo.title', }, { passedRounds, });
  
  return (
    <Box paddingY={1}>
      <Typography variant={'h5'} color={'primary'}>
        {mes}
      </Typography>
    </Box>
  );
};

export default PassedRoundsInfo;