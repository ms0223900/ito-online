import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PlayAreaProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';

const PlayArea = (props: PlayAreaProps) => {
  return (
    <Box>
      <Box>
        <Box>
          {props.latestCardNumber && (
            <Typography>
              {'Latest Card: ' + (props.latestCardNumber)}
            </Typography>
          )}
        </Box>
        <Box>
          {typeof props.cardNumberNow === 'number' ? (
            <Typography variant={'h3'}>
              {props.cardNumberNow}
            </Typography>
          ) : (
            <Typography>
              {'Waiting other play card...'}
            </Typography>
          )}
        </Box>
      </Box>
      <CTAButton
        disabled={!props.cardNumberNow}
        onClick={props.onPlayCard}
      >
        <Typography>
          {'Play Card'}
        </Typography>
      </CTAButton>
    </Box>
  );
};

export default PlayArea;