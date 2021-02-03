import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PlayingPart from '../../components/Playing/PlayingPart';
import usePlayingPart from './functions/usePlayingPart';

const PlayingPartContainer = () => {
  const {
    playingPartProps,
  } = usePlayingPart();

  if(!playingPartProps) {
    return (
      <Box paddingY={2}>
        <Typography variant={'h5'}>
          {'Game not start yet :)'}
        </Typography>
      </Box>
    );
  }

  return (
    <PlayingPart {...playingPartProps} />
  );
};

export default PlayingPartContainer;