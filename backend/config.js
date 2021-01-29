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

module.exports = {
  SOCKET_EVENT,
  MONGO_DB_CODE: 'mongodb+srv://test-merng:4pgdgWoS1NamoYd0@cluster0.zmfzq.mongodb.net/database?retryWrites=true&w=majority',
  SECRET_KEY: 'some-secret-key',
};
