import useQueryRoom from "api/custom-hooks/useQueryRoom";
import { socket } from "App";
import { SingleRoom } from "common-types";
import { PlayerItemProps } from "components/ito/RoomPart/components/WaitingRoom/types";
import { SOCKET_EVENT, USER_ACTION } from "config";
import { initItoState } from "constants/context";
import ItoSocket, { AddPlayerPayload, PlayerUpdateReadyPayload, RemovePlayerPayload, UpdateAllPlayersPayload } from "constants/itoSocket";
import { RouterParams } from "constants/ROUTES";
import useToggle from "lib/custom-hooks/useToggle";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import roomResolvers from "./roomResolvers";

const useWaitingRoomPart = () => {
  // --todo user from ctx--
  const {
    user
  } = initItoState;

  const {
    roomId,
  } = useParams<RouterParams>();
  const {
    toggle: isReady,
    handleToggle,
  } = useToggle(false);
  const queried = useQueryRoom({ roomId, });
  const [room, setRoom] = useState<SingleRoom>();

  const handleSetReady = useCallback(() => {
    handleToggle();
  }, []);

  const handleUpdateRoomPlayerReady = useCallback((payload: PlayerUpdateReadyPayload) => {
    setRoom(_room => (
      roomResolvers.udpateRoomUser({ room: _room, }, payload)
    ));
  }, []);
  const handleUpdateAllPlayers = useCallback((payload: UpdateAllPlayersPayload) => {
    setRoom(_room => (
      roomResolvers.updateRoomAllUsers({ room: _room, }, payload)
    ));
  }, []);
  const handleAddPalyerToRoom = useCallback((payload: AddPlayerPayload) => {
    setRoom(_room => (
      roomResolvers.addPlayer({ room: _room, }, payload)
    ));
  }, []);
  const handleRemovePlayerFromRoom = useCallback((payload: RemovePlayerPayload) => {
    setRoom(_room => (
      roomResolvers.removePlayer({ room: _room, }, payload)
    ));
  }, []);

  useEffect(() => {
    // 加入該房間
    ItoSocket.sendUserJoinRoom({
      user: user,
      roomId,
    });
    // 取得房間最新狀態
    const listener = ItoSocket.onListenGameStatus({
      onUpdateAllPlayers: handleUpdateAllPlayers,
      onUpdatePlayerReady: handleUpdateRoomPlayerReady,
      onAddPlayer: handleAddPalyerToRoom,
      onRemovePlayer: handleRemovePlayerFromRoom,
    });
    return () => {
      listener();
      console.log('leave room');
      ItoSocket.sendUserLeaveRoom({
        roomId,
        userId: user.id,
      });
    };
  }, [roomId, user]);

  useEffect(() => {
    ItoSocket.sendUserReady({
      userId: user.id,
      isReady,
    });
  }, [isReady, user.id]);

  useEffect(() => {
    if(queried.room) {
      setRoom(queried.room);
      socket.emit(SOCKET_EVENT.USER_ACTION, {
        userActionType: USER_ACTION.GET_ALL_PLAYERS_READY
      });
    }
  }, [queried.room]);

  const playerListData: PlayerItemProps[] = useMemo(() => (
    room ? (room.users || (room as any).players).map(p => ({
      ...p,
      isReady: !!(p.isReady),
      isMe: p.id === user.id,
      playerName: p.name || p.id,
    })) : []
  ), [room, user.id]);

  return ({
    isReady,
    loading: false,
    room,
    playerListData,
    handleSetReady,
  });
};

export default useWaitingRoomPart;