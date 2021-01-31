const DEV_API = 'http://localhost:5001';

export const API_URI = 
  process.env.NODE_ENV === 'development' ?
    DEV_API :
    process.env.REACT_APP_API_URI || DEV_API;

export const QUERY_ROOM_URI = API_URI + '/rooms';
export const CREATE_ROOM_URI = API_URI + '/room';