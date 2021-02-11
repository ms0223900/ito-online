import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { PlayAreaProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';
import IntlFormattedMessage from 'components/ito/Common/components/intl/IntlFormattedMessage';

const PlayArea = (props: PlayAreaProps) => {
  return (
    <Box>
      <Box>
        {props.latestCardNumber && (
          <IntlFormattedMessage 
            langKey={'playingPart.playArea.latestCard'}
            values={{
              latestCard: props.latestCardNumber,
            }}
          />
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
              <IntlFormattedMessage 
                langKey={'playingPart.playArea.waitingOthers'}
              />
            )}
          </Box>
          <CTAButton
            disabled={!props.cardNumberNow}
            onClick={props.onPlayCard}
          >
            <IntlFormattedMessage 
              langKey={'playingPart.playArea.playCard'}
            />
          </CTAButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default PlayArea;