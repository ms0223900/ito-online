import useQueryRoom from "api/custom-hooks/useQueryRoom";
import { socket } from "App";
import { SingleRoom } from "common-types";
import { PlayerItemProps } from "components/ito/RoomPart/components/WaitingRoom/types";
import { initItoState } from "constants/context";
import ItoSocket, { AddPlayerPayload, PlayerUpdateReadyPayload, RemovePlayerPayload } from "constants/itoSocket";
import { RouterParams } from "constants/ROUTES";
import useToggle from "lib/custom-hooks/useToggle";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

const resolvers = {
  udpateRoomUser: (state: { room: SingleRoom | undefined, }, payload: PlayerUpdateReadyPayload) => {
    const { room: _room, } = state;
    const { userId, isReady, } = payload;

    if(_room) {
      const players = _room.players;
      let _players = [...players];
      const playerIdx = _players.findIndex(p => p.id === userId);
      if(playerIdx !== -1) {
        _players[playerIdx] = {
          ..._players[playerIdx],
          isReady,
        };
        return ({
          ..._room,
          players: _players,
        });
      }
    }
    return _room;
  },

  addPlayer(state: { room: SingleRoom | undefined, }, payload: AddPlayerPayload) {

    const { room: _room, } = state;
    return _room;
  },

  removePlayer(state: { room: SingleRoom | undefined, }, payload: RemovePlayerPayload) {

    const { room: _room, } = state;
    return _room;
  },
};

const useWaitingRoomPart = () => {
  // --todo from ctx--
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
      resolvers.udpateRoomUser({ room: _room, }, payload)
    ));
  }, []);
  const handleAddPalyerToRoom = useCallback((payload: AddPlayerPayload) => {
    setRoom(_room => (
      resolvers.addPlayer({ room: _room, }, payload)
    ));
  }, []);
  const handleRemovePlayerFromRoom = useCallback((payload: RemovePlayerPayload) => {
    setRoom(_room => (
      resolvers.removePlayer({ room: _room, }, payload)
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
      onUpdatePlayerReady: handleUpdateRoomPlayerReady,
      onAddPlayer: handleAddPalyerToRoom,
      onRemovePlayer: handleRemovePlayerFromRoom,
    });
    return () => {
      listener();
    };
  }, [handleAddPalyerToRoom, handleRemovePlayerFromRoom, handleUpdateRoomPlayerReady, roomId, user]);

  useEffect(() => {
    ItoSocket.sendUserReady({
      userId: user.id,
      isReady,
    });
  }, [isReady, user.id]);

  useEffect(() => {
    if(queried.room) {
      setRoom(queried.room);
    }
  }, [queried.room]);

  const playerListData: PlayerItemProps[] = useMemo(() => (
    room ? room.players.map(p => ({
      ...p,
      isReady: !!(p.isReady),
      isMe: p.id === user.id,
      playerName: p.name || p.id,
    })) : []
  ), [room, user.id]);

  return ({
    isReady,
    loading: queried.loading,
    room,
    playerListData,
    handleSetReady,
  });
};

export default useWaitingRoomPart;