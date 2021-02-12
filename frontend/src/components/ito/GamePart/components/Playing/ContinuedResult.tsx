import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PassedRoundsInfo from './PassedRoundsInfo';
import { ContinuedResultProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';
import IntlFormattedMessage from 'components/ito/Common/components/intl/IntlFormattedMessage';
import { getOperator } from './FailSuccessResult';

const ContinuedResult = (props: ContinuedResultProps) => {
  const {
    nextCardNumber,
    prevCardNumber,
    resultType,
    isContinuedFailed,
  } = props;
  
  return (
    <Box>
      <Typography variant={'h5'} align={'center'}>
        {`${nextCardNumber}`}
      </Typography>
      <PassedRoundsInfo {...props} />
      {isContinuedFailed && (
        <IntlFormattedMessage
          color={'textSecondary'}
          langKey={'playingPart.continuedResult.hint'}
        />
      )}
      <Box>
        <CTAButton disabled={props.isConfirmed} onClick={props.onContinue}>
          {props.isConfirmed ? (
            <IntlFormattedMessage 
              langKey={'playingPart.continuedResult.confirmedWaiting'}
            />
          ) : (
            <IntlFormattedMessage 
              langKey={'playingPart.continuedResult.confirmContinue'}
            />
          )}
        </CTAButton>
        <CTAButton color={'default'} onClick={props.onOverGame}>
          <IntlFormattedMessage 
            langKey={'leaveGame'}
          />
        </CTAButton>
      </Box>
    </Box>
  );
};

export default ContinuedResult;