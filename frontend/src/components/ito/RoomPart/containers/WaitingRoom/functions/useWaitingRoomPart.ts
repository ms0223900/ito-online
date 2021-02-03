import { setGamePlayingStatus, SetGamePlayingStatusPayload } from "actions";
import useQueryRoom from "api/custom-hooks/useQueryRoom";
import { socket } from "App";
import { GamePlayingStatusFromSocketPayload, SingleRoom, SingleUser } from "common-types";
import { PlayerItemProps } from "components/ito/RoomPart/components/WaitingRoom/types";
import { SOCKET_EVENT, USER_ACTION } from "config";
import ContextStore, { initItoState } from "constants/context";
import ItoSocket, { AddPlayerPayload, PlayerUpdateReadyPayload, RemovePlayerPayload, UpdateAllPlayersPayload } from "constants/itoSocket";
import ROUTES, { RouterParams } from "constants/ROUTES";
import useToggle from "lib/custom-hooks/useToggle";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import makeGamePlayingPayload from "./makeGamePlayingPayload";
import roomResolvers from "./roomResolvers";

export interface UseWaitingRoomPartOptions {
  setGamePlayingStatusToCtx: typeof setGamePlayingStatus
}

const useWaitingRoomPart = ({
  setGamePlayingStatusToCtx,
}: UseWaitingRoomPartOptions) => {
  const {
    state: {
      user,
      gamePlayingStatus,
    }
  } = useContext(ContextStore);

  const {
    roomId,
  } = useParams<RouterParams>();
  const history = useHistory();

  const {
    toggle: isReady,
    handleToggle,
  } = useToggle(false);
  const queried = useQueryRoom({ roomId, });
  const [room, setRoom] = useState<SingleRoom>();
  const [users, setUsers] = useState<SingleUser[]>([]);

  const handleSetReady = useCallback(() => {
    handleToggle();
  }, []);

  const handleUpdateRoomPlayerReady = useCallback((payload: PlayerUpdateReadyPayload) => {
    setRoom(_room => (
      roomResolvers.udpateRoomUser({ room: _room, }, payload)
    ));
  }, []);
  const handleUpdateAllPlayers = useCallback((payload: UpdateAllPlayersPayload) => {
    setUsers(payload.users);
  }, []);
  const handleAddPalyerToRoom = useCallback((payload: AddPlayerPayload) => {
    setRoom(_room => (
      roomResolvers.addPlayer({ room: _room, }, payload)
    ));
  }, []);
  const handleRemovePlayerFromRoom = useCallback((payload: RemovePlayerPayload) => {
    setUsers(users => (
      roomResolvers.removePlayer({ users, }, payload)
    ));
  }, []);
  const handleGameStart = useCallback((payload: GamePlayingStatusFromSocketPayload) => {
    console.log(payload);
    // 轉為user自己的
    const ctxPayload = makeGamePlayingPayload({
      user,
      roomId,
      payloadFromSocket: payload,
    });

    setGamePlayingStatusToCtx(ctxPayload as any);
    history.push(ROUTES.playing);
  }, [history, roomId, setGamePlayingStatusToCtx, user]);

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
      onGameStart: handleGameStart,
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
    users.map(p => ({
      ...p,
      isReady: !!(p.isReady),
      isMe: p.id === user.id,
      playerName: p.name || p.id,
    }))
  ), [users, user.id]);

  return ({
    isReady,
    loading: false,
    room,
    playerListData,
    handleSetReady,
  });
};

export default useWaitingRoomPart;