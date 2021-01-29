const {
  SOCKET_EVENT,
} = require('../../config.js');

const emitMessage = (socket, roomId='') => () => {
  // const namespace = io.of('/');

  console.log('Rooms', socket.rooms);
  socket.to(roomId).emit('room-mes', {
    message: `message from room: ${roomId}`
  });
};

const GAME_STATUS = {
  READY: 'READY',

};

class SocketRoom {
  static leaveAllRooms(socket) {
    const rooms = socket.rooms;
    for (const room of rooms) {
      socket.leave(room);
    }
  }

  static enterRoom(socket) {
    return (roomId='') => {
      if(roomId) {
        this.leaveAllRooms(socket);
        socket.join(roomId);
      }
    };
  }


}



class GameSocket {
  constructor({
    socket={},
    initLife=3,
    gameStatus=GAME_STATUS.READY,
  }) {
    this.life = initLife;
    this.gameStatus = gameStatus;
    this.socket = socket;
  }

  getUserStatus(callback) {
    this.socket.on(SOCKET_EVENT.USER_STATUS, e => {
      if(e) {
        callback(e);
      }
    });
  }

  sendGameStatus(roomId='', payload={
    status: GAME_STATUS.READY, 
  }) {
    this.socket.emit(SOCKET_EVENT.GAME_STATUS, payload);
  }

  sendCardComparedResult(cardNumber=0) {
    const res = {};
    this.socket.emit(SOCKET_EVENT.COMPARED_RESULT, res);
  }
}

module.exports = {
  emitMessage,
  GameSocket,
};