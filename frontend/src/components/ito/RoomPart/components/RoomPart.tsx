import React from 'react';
import { Box, Button, CircularProgress, Divider } from '@material-ui/core';
import RoomList from './RoomList';
import { RoomPartProps } from './types';

const RoomPart = (props: RoomPartProps) => {
  return (
    <Box
      textAlign={'center'}
    >
      {props.loading ? (
        <CircularProgress />
      ) : (
        <RoomList {...props} />
      )}
      {/* <Box paddingY={1}>
        <Divider />
      </Box> */}
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