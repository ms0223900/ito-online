import useQueryRoom from "api/custom-hooks/useQueryRoom";
import { socket } from "App";
import { SingleRoom } from "common-types";
import { initItoState } from "constants/context";
import ItoSocket, { PlayerUpdateReadyPayload } from "constants/itoSocket";
import { RouterParams } from "constants/ROUTES";
import useToggle from "lib/custom-hooks/useToggle";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

const resolvers = {
  udpateRoom: (state: { room: SingleRoom | undefined, }, payload: PlayerUpdateReadyPayload) => {
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
  }
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
  const queried = useQueryRoom();
  const [room, setRoom] = useState<SingleRoom>();

  const handleSetReady = useCallback(() => {
    handleToggle();
  }, []);

  const handleUpdateRoomPlayerReady = useCallback((payload: PlayerUpdateReadyPayload) => {
    setRoom(_room => (
      resolvers.udpateRoom({ room: _room, }, payload)
    ));
  }, []);

  useEffect(() => {
    // 加入該房間
    ItoSocket.sendUserJoinRoom({
      user: user,
      roomId,
    });
    // 取得房間最新狀態
    const listener = ItoSocket.listenPlayerReadyUpdate(handleUpdateRoomPlayerReady);
    return () => {
      listener();
    };
  }, [handleUpdateRoomPlayerReady, roomId, user]);

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

  return ({
    loading: queried.loading,
    room,
    handleSetReady,
  });
};

export default useWaitingRoomPart;