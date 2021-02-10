import React from 'react';
import { Box, Button, Divider, TextField } from '@material-ui/core';
import { CreateRoomPartProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';
import { useIntl } from 'react-intl';

const CreateRoomPart = (props: CreateRoomPartProps) => {
  const { messages, } = useIntl();

  return (
    <Box
      textAlign={'center'}
    >
      <TextField
        value={props.value}
        variant={'outlined'}
        placeholder={messages['createRoomPart.roomNameInput.placeholder'] as any}
        onChange={props.onChange}
      />
      <Box paddingY={1}>
        <Divider />
      </Box>
      <CTAButton
        disabled={props.loading}
        onClick={props.onCreateRoom}
      >
        {props.loading ? 
          messages['createRoomPart.creating'] : 
          messages['createRoomPart.confirmCreate']
        }
      </CTAButton>
    </Box>
  );
};

export default CreateRoomPart;