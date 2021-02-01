import useQueryRoom from "api/custom-hooks/useQueryRoom";
import { socket } from "App";
import { initItoState } from "constants/context";
import ItoSocket from "constants/itoSocket";
import useToggle from "lib/custom-hooks/useToggle";
import { useCallback, useEffect } from "react";

const useWaitingRoomPart = () => {
  const {
    toggle: isReady,
    handleToggle,
  } = useToggle(false);
  const queried = useQueryRoom();

  const handleSetReady = useCallback(() => {
    handleToggle();
  }, []);

  useEffect(() => {
    // 加入該房間
    // 取得房間最新狀態
  }, []);

  useEffect(() => {
    ItoSocket.sendUserReady({
      // --todo from ctx--
      userId: initItoState.user.id,
      isReady,
    });
  }, [isReady]);

  return ({
    loading: queried.loading,
    room: queried.room,
  });
};

export default useWaitingRoomPart;