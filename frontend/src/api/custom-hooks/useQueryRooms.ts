import { SingleRoom } from "common-types";
import { useEffect } from "react";
import { API_URI } from "../../constants/API";
import useFetch from "../../lib/custom-hooks/useFetch";


const URI = API_URI + '/rooms';

const useQueryRooms = () => {
  const fetched = useFetch<SingleRoom[]>({
    apiPath: URI,
    initResponseData: [],
    requestInit: {
      // mode: 'no-cors',
    }
  });

  useEffect(() => {
    fetched.fetchData();
  }, []);

  return fetched;
};

export default useQueryRooms;