import React from 'react';
import { Box, List, Typography } from '@material-ui/core';
import RoomItem from './RoomItem';
import { RoomListProps } from './types';

const RoomList = (props: RoomListProps) => {
  return (
    <List>
      {props.roomListData.map((r, i) => (
        <RoomItem key={i} {...r} />
      ))}
      {props.roomListData.length === 0 && (
        <Typography variant={'h5'} color={'initial'} style={{
          opacity: 0.3,
        }}>
          {'No Rooms found :('}
        </Typography>
      )}
    </List>
  );
};

export default RoomList;