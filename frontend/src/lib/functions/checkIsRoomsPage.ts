import ROUTES from "constants/ROUTES";

const checkIsRoomPage = (pathnameNow='') => {
  // console.log(pathnameNow);
  return pathnameNow === ROUTES.homepage ||
    pathnameNow === ROUTES.rooms;
};

export default checkIsRoomPage;