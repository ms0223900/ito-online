import useQueryRooms from "api/custom-hooks/useQueryRooms";
import { QUERY_ROOM_URI } from "constants/API";
import ROUTES from "constants/ROUTES";
import useFetch from "lib/custom-hooks/useFetch";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { EnterRoomFn, RoomItemData, RoomPartProps } from "../../components/types";



const useRoomPart = () => {
  const history = useHistory();
  const fetched = useQueryRooms();

  const handleCreateRoom = useCallback(() => {
    history.push(ROUTES.createRoom);
  }, [history]);

  const handleEnterRoom: EnterRoomFn = useCallback((roomId) => () => {
    const URI = 
    history.push(ROUTES.room, );
  }, []);

  const roomListData: RoomItemData[] = useMemo(() => (
    fetched.responseData.map(r => ({
      // --todo--要把資料庫的players改掉
      room: r,
      playersAmount: r.users.length,
    }))
  ), [fetched.responseData]);

  return ({
    ...fetched,
    handleEnterRoom,
    handleCreateRoom,
    roomListData,
  });
};

export default useRoomPart;