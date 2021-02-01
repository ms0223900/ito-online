import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PlayerList from './PlayerList';
import ReadyButton from './ReadyButton';
import { WaitingRoomProps } from './types';

const WaitingRoomPart = (props: WaitingRoomProps) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
    >
      <Box>
        <Typography variant={'h5'}>
          {`Room: ${props.roomName}`}
        </Typography>
        <PlayerList {...props} />
      </Box>
      <Box>
        <ReadyButton {...props} />
      </Box>
    </Box>
  );
};

export default WaitingRoomPart;