const DEV_API = 'http://localhost:5001';

export const API_URI = 
  process.env.NODE_ENV === 'development' ?
    DEV_API :
    process.env.REACT_APP_API_URI || DEV_API;

export const QUERY_ROOM_URI = API_URI + '/rooms';
export const CREATE_ROOM_URI = API_URI + '/room';
export const CREATE_QUESTION_URI = API_URI + '/theme-question';
export const QUERY_QUESTIONS_URI = API_URI + '/theme-questions';