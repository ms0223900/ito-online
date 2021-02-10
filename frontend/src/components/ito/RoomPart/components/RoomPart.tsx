import React from 'react';
import { Box, Button, CircularProgress, Divider } from '@material-ui/core';
import RoomList from './RoomList';
import { RoomPartProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';
import IntlFormattedMessage from 'components/ito/Common/components/intl/IntlFormattedMessage';

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
        fullWidth={true}
        onClick={props.onCreateRoom}
      >
        <IntlFormattedMessage
          langKey={'roomPart.createNewRoom'}
        />
      </CTAButton>
      <CTAButton 
        color={'primary'} 
        variant={'outlined'}
        fullWidth={true}
        onClick={props.onCreateQuestion}
      >
        <IntlFormattedMessage
          langKey={'roomPart.createNewQuestion'}
        />
      </CTAButton>
    </Box>
  );
};

export default RoomPart;