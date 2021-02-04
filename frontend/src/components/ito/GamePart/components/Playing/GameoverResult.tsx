import React from 'react';
import { Box } from '@material-ui/core';
import { GameoverResultProps } from './types';
import PassedRoundsInfo from './PassedRoundsInfo';
import CTAButton from 'components/ito/Common/components/CTAButton';

const GameoverResult = (props: GameoverResultProps) => {
  return (
    <Box>
      <PassedRoundsInfo {...props} />
      <Box>
        <CTAButton color={'default'} onClick={props.onOverGame}>
          {'Leave Game'}
        </CTAButton>
      </Box>
    </Box>
  );
};

export default GameoverResult;