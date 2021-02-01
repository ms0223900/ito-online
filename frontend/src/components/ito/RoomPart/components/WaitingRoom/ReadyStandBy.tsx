import React from 'react';
import { Box } from '@material-ui/core';
import { ReadyStandByProps } from './types';
import { Check } from '@material-ui/icons';

const ReadyStandBy = (props: ReadyStandByProps) => {
  return (
    <Box padding={1}>
      {props.isReady ? (
        <Box>
          <Check />
          {'Ready!'}
        </Box>
      ) : (
        <Box>
          {'Stand by...'}
        </Box>
      )}
    </Box>
  );
};

export default ReadyStandBy;