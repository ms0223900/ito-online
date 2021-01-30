import { API_URI } from "../constants/API";

const URI = API_URI + '/rooms';
const queryRooms = () => {
  return fetch(URI)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(e => {
      console.log(e);
    });
};

export default queryRooms;