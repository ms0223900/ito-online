import React from 'react';
import { Box, List, Typography } from '@material-ui/core';
import RoomItem from './RoomItem';
import { RoomListProps } from './types';
import IntlFormattedMessage from 'components/ito/Common/components/intl/IntlFormattedMessage';

const RoomList = (props: RoomListProps) => {
  return (
    <List>
      {props.roomListData.map((r, i) => (
        <RoomItem key={i} {...r} />
      ))}
      {props.roomListData.length === 0 && (
        <IntlFormattedMessage 
          variant={'h5'} color={'initial'} style={{
            opacity: 0.3,
          }}
          langKey={'roomPart.noRooms'}
        />
      )}
    </List>
  );
};

export default RoomList;