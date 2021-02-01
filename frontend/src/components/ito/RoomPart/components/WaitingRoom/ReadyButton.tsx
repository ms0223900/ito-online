import React from 'react';
import { Box, Button } from '@material-ui/core';
import { ReadyButtonProps } from './types';

const ReadyButton = (props: ReadyButtonProps) => {
  return (
    <Button onClick={props.onReady}>
      {props.isPlayerReady ? 'Waiting for others...' : 'Ready'}
    </Button>
  );
};

export default ReadyButton;