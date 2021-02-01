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

  const handleEnterRoom: EnterRoomFn = useCallback(() => () => {
    
  }, []);

  const roomListData: RoomItemData[] = useMemo(() => (
    fetched.responseData.map(r => ({
      room: r,
      playersAmount: r.players.length,
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