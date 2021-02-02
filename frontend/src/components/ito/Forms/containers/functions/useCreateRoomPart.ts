import { SingleRoom } from "common-types";
import { CREATE_ROOM_URI } from "constants/API";
import ContextStore from "constants/context";
import useFetch from "lib/custom-hooks/useFetch";
import useInput from "lib/custom-hooks/useInput";
import { useCallback, useContext, useEffect } from "react";
import { useHistory } from "react-router";

const useCreateRoomPart = () => {
  const {
    state: {
      user,
    },
  } = useContext(ContextStore);
  const history = useHistory();
  const {
    value,
    handleChangeInput,
  } = useInput({
    initValue: '',
  });
  const fetched = useFetch<SingleRoom | undefined>({
    apiPath: CREATE_ROOM_URI,
    initResponseData: undefined,
    isPostMethod: true,
  });

  const handleCreateRoom = useCallback(() => {
    try {
      fetched.fetchData({
        postForm: {
          type: 'CREATE',
          name: value,
          user,
        }
      });
    } catch (error) {
      console.log(error);
    };
  }, [fetched, value, user]);

  useEffect(() => {
    fetched.responseData && 
    history.push('/room/' + (fetched.responseData as any)._id);
  }, [fetched.responseData]);

  return ({
    value,
    handleChangeInput,
    handleCreateRoom,
  });
};

export default useCreateRoomPart;