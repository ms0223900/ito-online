import { CREATE_ROOM_URI } from "constants/API";
import useFetch from "lib/custom-hooks/useFetch";
import useInput from "lib/custom-hooks/useInput";
import { useCallback } from "react";

const mockUser = {
  id: '11',
  name: 'aabb',
};

const useCreateRoomPart = () => {
  const {
    value,
    handleChangeInput,
  } = useInput({
    initValue: '',
  });
  const fetched = useFetch({
    apiPath: CREATE_ROOM_URI,
    initResponseData: {},
    isPostMethod: true,
  });

  const handleCreateRoom = useCallback(() => {
    try {
      fetched.fetchData({
        postForm: {
          type: 'CREATE',
          name: value,
          user: mockUser,
        }
      });
    } catch (error) {
      console.log(error);
    };
  }, [value]);

  return ({
    value,
    handleChangeInput,
    handleCreateRoom,
  });
};

export default useCreateRoomPart;