import { SingleRoom } from "common-types";
import { API_URI } from "constants/API";
import useFetch from "lib/custom-hooks/useFetch";
import { useEffect } from "react";

const getURI = (roomId='') => API_URI + '/room/' + roomId;

const useQueryRoom = ({ roomId }: { roomId: string}) => {
  const fetched = useFetch<SingleRoom | undefined>({
    apiPath: getURI(roomId),
    initResponseData: undefined,
  });

  useEffect(() => {
    fetched.fetchData();
  }, []);

  return ({
    ...fetched,
    room: fetched.responseData,
  });
};

export default useQueryRoom;