import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PassedRoundsInfo from './PassedRoundsInfo';
import { ContinuedResultProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';

const ContinuedResult = (props: ContinuedResultProps) => {
  const {
    isContinuedFailed,
  } = props;
  
  return (
    <Box>
      <PassedRoundsInfo {...props} />
      {isContinuedFailed && (
        <Typography color={'textSecondary'}>{'Game continued failed... :('}</Typography>
      )}
      <Box>
        <CTAButton disabled={props.isConfirmed} onClick={props.onContinue}>
          {'Continue!'}
        </CTAButton>
        <CTAButton color={'default'} onClick={props.onOverGame}>
          {'Leave Game'}
        </CTAButton>
      </Box>
    </Box>
  );
};

export default ContinuedResult;