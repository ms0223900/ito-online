import React from 'react';
import { Box, Button, Divider, TextField } from '@material-ui/core';
import { CreateRoomPartProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';

const CreateRoomPart = (props: CreateRoomPartProps) => {
  return (
    <Box
      textAlign={'center'}
    >
      <TextField
        value={props.value}
        variant={'outlined'}
        placeholder={'Input room name...'}
        onChange={props.onChange}
      />
      <Box paddingY={1}>
        <Divider />
      </Box>
      <CTAButton
        disabled={props.loading}
        onClick={props.onCreateRoom}
      >
        {props.loading ? 'Creating...' : 'Create Room'}
      </CTAButton>
    </Box>
  );
};

export default CreateRoomPart;