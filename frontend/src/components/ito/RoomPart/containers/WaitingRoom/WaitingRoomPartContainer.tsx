import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import WaitingRoomPart from '../../components/WaitingRoom/WaitingRoomPart';
import useWaitingRoomPart, { UseWaitingRoomPartOptions } from './functions/useWaitingRoomPart';
import { MapDispatchToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import { setGamePlayingStatus } from 'actions';
import { connectCtx } from 'react-function-helpers';
import ContextStore from 'constants/context';
import { WaitingRoomPartContainerProps } from './types';

const WaitingRoomPartContainer = (props: WaitingRoomPartContainerProps) => {
  const {
    isReady,
    loading,
    room,
    playerListData,
    handleSetReady,
  } = useWaitingRoomPart(props);

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

export interface OwnProps {
  
}
interface Dispatches extends Pick<UseWaitingRoomPartOptions, 'setGamePlayingStatusToCtx'> {

}

const mapDispatchToProps: MapDispatchToProps<OwnProps, Dispatches> = (dispatch) => {
  return ({
    setGamePlayingStatusToCtx: (payload) => {
      const action = setGamePlayingStatus(payload);
      dispatch(action);
      return action;
    }
  });
};


const WaitingRoomPartContainerWithCtx = connectCtx(ContextStore)(undefined, mapDispatchToProps)(WaitingRoomPartContainer);

export default WaitingRoomPartContainerWithCtx;