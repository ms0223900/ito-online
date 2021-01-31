import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { CreateRoomPartProps } from './types';

const CreateRoomPart = (props: CreateRoomPartProps) => {
  return (
    <Box>
      <TextField
        {...props}
        variant={'outlined'}
        placeholder={'Input room name...'}
      />
      <Button
        onClick={props.onCreateRoom}
      >
        {'Create Room'}
      </Button>
    </Box>
  );
};

export default CreateRoomPart;