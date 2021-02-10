import React from 'react';
import { Box } from '@material-ui/core';
import RoomPart from '../components/RoomPart';
import useRoomPart from './functions/useRoomPart';

const RoomPartContainer = () => {
  const roomPartState = useRoomPart();
  
  return (
    <RoomPart 
      loading={roomPartState.loading}
      roomListData={roomPartState.roomListData}
      onEnterRoom={roomPartState.handleEnterRoom}
      onCreateRoom={roomPartState.handleCreateRoom}
      onCreateQuestion={roomPartState.handleCreateQuestion}
    />
  );
};

export default RoomPartContainer;