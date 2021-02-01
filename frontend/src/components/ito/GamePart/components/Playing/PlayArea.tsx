import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { PlayAreaProps } from './types';

const PlayArea = (props: PlayAreaProps) => {
  return (
    <Box>
      <Box>
        {typeof props.cardNumberNow === 'number' ? (
          <Typography variant={'h3'}>
            {props.cardNumberNow}
          </Typography>
        ) : (
          <Typography>
            {'Waiting other play card'}
            {'Latest Card: ' + props.latestCardNumber}
          </Typography>
        )}
      </Box>
      <Button
        disabled={!props.cardNumberNow}
        onClick={props.onPlayCard}
      >
        {'Play Card!'}
      </Button>
    </Box>
  );
};

export default PlayArea;