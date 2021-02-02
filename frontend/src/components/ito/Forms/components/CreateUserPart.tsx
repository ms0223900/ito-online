import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { CreateUserPartProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';

const CreateUserPart = (props: CreateUserPartProps) => {
  return (
    <Box>
      <TextField
        {...props}
        variant={'outlined'}
        placeholder={'Input user name...'}
      />
      <CTAButton onClick={props.onCreateUser}>
        {'Create User'}
      </CTAButton>
    </Box>
  );
};

export default CreateUserPart;