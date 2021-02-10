import React from 'react';
import { Box, Button, CircularProgress, Divider } from '@material-ui/core';
import RoomList from './RoomList';
import { RoomPartProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';

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
      <CTAButton 
        color={'primary'} 
        variant={'outlined'}
        onClick={props.onCreateRoom}
      >
        {'Create Room'}
      </CTAButton>
      <CTAButton 
        color={'primary'} 
        variant={'outlined'}
        onClick={props.onCreateQuestion}
      >
        {'Create Question'}
      </CTAButton>
    </Box>
  );
};

export default RoomPart;