import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import WaitingRoomPart from '../../components/WaitingRoom/WaitingRoomPart';
import useWaitingRoomPart from './functions/useWaitingRoomPart';

const WaitingRoomPartContainer = () => {
  const {
    isReady,
    loading,
    room,
    playerListData,
    handleSetReady,
  } = useWaitingRoomPart();

  if(room) {
    return (
      <WaitingRoomPart
        roomName={room.name || room.id}
        isPlayerReady={isReady}
        playerListData={playerListData}
        onReady={handleSetReady}
      />
    );
  }
  else if(loading) {
    return (
      <CircularProgress />
    );
  }
  return null;
};

export default WaitingRoomPartContainer;