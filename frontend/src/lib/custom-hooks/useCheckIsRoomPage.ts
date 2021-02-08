import checkIsRoomPage from "lib/functions/checkIsRoomsPage";
import { useLocation } from "react-router";

const useCheckIsRoomPage = () => {
  const location = useLocation();
  const isRoomPage = checkIsRoomPage(location.pathname);

  return ({
    isRoomPage,
  });
};

export default useCheckIsRoomPage;