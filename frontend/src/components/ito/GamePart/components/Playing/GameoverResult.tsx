import React from 'react';
import { Box } from '@material-ui/core';
import { GameoverResultProps } from './types';
import PassedRoundsInfo from './PassedRoundsInfo';
import CTAButton from 'components/ito/Common/components/CTAButton';
import IntlFormattedMessage from 'components/ito/Common/components/intl/IntlFormattedMessage';

const GameoverResult = (props: GameoverResultProps) => {
  return (
    <Box>
      <PassedRoundsInfo {...props} />
      <Box>
        <CTAButton color={'default'} onClick={props.onOverGame}>
          <IntlFormattedMessage 
            langKey={'leaveGame'}
          />
        </CTAButton>
      </Box>
    </Box>
  );
};

export default GameoverResult;