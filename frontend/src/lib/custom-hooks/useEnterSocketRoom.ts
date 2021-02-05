import { SingleUser } from "common-types";
import ItoSocket from "constants/itoSocket";
import { useEffect } from "react";

export interface UseEnterSocketRoomOptions {
  roomId: string
  user: SingleUser
}

const useEnterSocketRoom = ({
  roomId, user
}: UseEnterSocketRoomOptions) => {
  useEffect(() => {
    // 加入該房間
    if(roomId) {
      console.log(`Enter room: ${roomId}`);
      ItoSocket.sendUserJoinRoom({
        user: user,
        roomId,
      });
    }
    
    return () => {
      console.log('leave room');
      ItoSocket.sendUserLeaveRoom({
        roomId,
        userId: user.id,
      });
    };
  }, [roomId, JSON.stringify(user)]);
};

export default useEnterSocketRoom;