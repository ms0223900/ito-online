import React from 'react';
import { Box, Button } from '@material-ui/core';
import RoomList from './RoomList';
import { RoomPartProps } from './types';

const RoomPart = (props: RoomPartProps) => {
  return (
    <Box>
      <RoomList {...props} />
      <Button 
        color={'primary'} 
        variant={'outlined'}
        onClick={props.onCreateRoom}
      >
        {'Create Room'}
      </Button>
    </Box>
  );
};

export default RoomPart;