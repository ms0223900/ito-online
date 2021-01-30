const SOCKET_EVENT = {
  ADD_COUNT: 'ADD_COUNT',
  JOIN_ROOM: 'JOIN_ROOM',
  ROOM_MES: 'ROOM_MES',
  CHAT: 'CHAT',
  GAME_STATUS: 'GAME_STATUS',
  COMPARED_RESULT: 'COMPARED_RESULT',
  USER_STATUS: 'USER_STATUS',
  USER_ACTION: 'USER_ACTION',
};

const GAME_STATUS = {
  READY: 'READY',
  START: 'START',
  CONTINUED: 'CONTINUED',
  PASS: 'PASS',
  OVER: 'OVER',
  ERROR: 'ERROR',
};

const USER_ACTION = {
  PLAY_CARD: 'PLAY_CARD',
  SET_READY: 'SET_READY',
};

module.exports = {
  SOCKET_EVENT,
  GAME_STATUS,
  USER_ACTION,
  MONGO_DB_CODE: 'mongodb+srv://test-merng:4pgdgWoS1NamoYd0@cluster0.zmfzq.mongodb.net/database?retryWrites=true&w=majority',
  SECRET_KEY: 'some-secret-key',
};
