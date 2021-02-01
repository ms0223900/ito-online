import React from 'react';
import { Box } from '@material-ui/core';
import LifeList from '../LifeList';
import PlayArea from './PlayArea';
import ThemeQuestion from './ThemeQuestion';
import { PlayingPartProps } from './types';
import PlayedResult from './PlayedResult';

const PlayingPart = (props: PlayingPartProps) => {
  return (
    <Box>
      <>
        <LifeList {...props} />
        <ThemeQuestion {...props} />
        <PlayArea {...props} />
      </>
      <PlayedResult {...props} />
    </Box>
  );
};

export default PlayingPart;