import { SingleRoom } from "common-types";
import { API_URI } from "constants/API";
import useFetch from "lib/custom-hooks/useFetch";
import { useEffect } from "react";

const URI = API_URI + '/room';

const useQueryRoom = () => {
  const fetched = useFetch<SingleRoom | undefined>({
    apiPath: URI,
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