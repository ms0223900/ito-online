import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { CreateUserPartProps } from './types';

const CreateUserPart = (props: CreateUserPartProps) => {
  return (
    <Box>
      <TextField
        {...props}
        variant={'outlined'}
        placeholder={'Input user name...'}
      />
      <Button
        onClick={props.onCreateUser}
      >
        {'Create User'}
      </Button>
    </Box>
  );
};

export default CreateUserPart;