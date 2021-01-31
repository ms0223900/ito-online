import { SingleRoom } from "api/custom-hooks/useQueryRooms";
import { QUERY_ROOM_URI } from "constants/API";
import ROUTES from "constants/ROUTES";
import useFetch from "lib/custom-hooks/useFetch";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { RoomPartProps } from "../../components/types";



const useRoomPart = () => {
  const history = useHistory();
  const fetched = useFetch<SingleRoom[]>({
    apiPath: QUERY_ROOM_URI,
    initResponseData: [],
  });

  const handleCreateRoom = useCallback(() => {
    history.push(ROUTES.createRoom);
  }, [history]);

  const roomListData: RoomPartProps['roomListData'] = useMemo(() => (
    fetched.responseData.map(r => ({
      room: r,
      playersAmount: r.players.length,
    }))
  ), [fetched.responseData]);

  useEffect(() => {
    fetched.fetchData();
  }, []);

  return ({
    ...fetched,
    handleCreateRoom,
    roomListData,
  });
};

export default useRoomPart;