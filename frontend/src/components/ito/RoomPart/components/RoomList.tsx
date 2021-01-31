import React from 'react';
import { Box, List } from '@material-ui/core';
import RoomItem from './RoomItem';
import { RoomListProps } from './types';

const RoomList = (props: RoomListProps) => {
  return (
    <List>
      {props.roomListData.map((r, i) => (
        <RoomItem key={i} {...r} />
      ))}
    </List>
  );
};

export default RoomList;