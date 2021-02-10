import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { PlayAreaProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';

const PlayArea = (props: PlayAreaProps) => {
  return (
    <Box>
      <Box>
        {props.latestCardNumber && (
          <Typography align={'center'}>
            {'Latest Card: ' + (props.latestCardNumber)}
          </Typography>
        )}
      </Box>
      <Box paddingY={2}>
        <Paper>
          <Box textAlign={'center'}>
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
          <CTAButton
            disabled={!props.cardNumberNow}
            onClick={props.onPlayCard}
          >
            <Typography>
              {'Play Card'}
            </Typography>
          </CTAButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default PlayArea;