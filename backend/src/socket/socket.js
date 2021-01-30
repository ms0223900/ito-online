const {
  SOCKET_EVENT, GAME_STATUS, USER_ACTION,
} = require('../../config.js');
const {
  ItoGame,
} = require('./ItoGame');

const emitMessage = (socket, roomId='') => () => {
  // const namespace = io.of('/');

  console.log('Rooms', socket.rooms);
  socket.to(roomId).emit('room-mes', {
    message: `message from room: ${roomId}`
  });
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
    roomId='',
    io={},
    socket={},
    gameStatus=GAME_STATUS.READY,
    firstUser,
  }) {
    this.roomId = roomId;
    this.gameStatus = gameStatus;
    this.io = io;
    this.socket = socket;
    this.game = new ItoGame({});
    firstUser && this.game.addPlayer(firstUser);
  }

  initGame(socket, io) {
    this.io = io;
    this.onListenUserActions(socket);
  }

  onListenUserActions(socket, actions) {
    socket.on(SOCKET_EVENT.USER_ACTION, e => {
      if(e) {
        console.log(`Action: `, e);
        switch (e.userActionType) {
        case USER_ACTION.PLAY_CARD: {
          const { userId, cardNumber, } = e;
          if(userId && cardNumber) {
            this.sendCardComparedResult({ userId, cardNumber, });
          }
        }
        case USER_ACTION.SET_READY: {
          const { isReady, userId, } = e;
          this.setPlayerReady({ isReady, userId, });
          const allAreReady = this.checkAllPlayerAreReady();
          if(allAreReady) {
            this.sendGameStart();
          }
          console.log(allAreReady);
        }
        default:
          break;
        }
      }
    });
  }
  removeListeners() {
    this.socket.removeAllListeners([
      SOCKET_EVENT.USER_ACTION,
    ]);
  }

  setPlayerReady({
    isReady=false,
    userId='',
  }) {
    const playerIdx = this.game.players.findIndex(p => p.id === userId);
    if(playerIdx !== -1) {
      this.game.players[playerIdx].isReady = isReady;
    }
  }
  checkAllPlayerAreReady() {
    return this.game.players.every(p => p.isReady);
  }

  sendGameStart() {
    this.game.getQuestionAndCard()
      .then(payload => {
        this.io
          .in(this.roomId)
          .emit(SOCKET_EVENT.GAME_STATUS, payload);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onListenUserStatus(callback) {
    this.socket.on(SOCKET_EVENT.USER_STATUS, e => {
      if(e) {
        const { status } = e;
        callback(e);
      }
    });
  }

  sendGameStatus(roomId='', payload={
    status: GAME_STATUS.READY, 
  }) {
    this.socket.emit(SOCKET_EVENT.GAME_STATUS, payload);
  }

  sendCardComparedResult({ userId, cardNumber, }) {
    const res = this.game.compareCard({ userId, cardNumber, });
    if(res.gameStatus === GAME_STATUS.PASS || 
      res.gameStatus === GAME_STATUS.OVER
    ) {
      this.game.init();
    }
    this.socket.emit(SOCKET_EVENT.COMPARED_RESULT, res);
  }
}

class GamesManager {
  constructor() {
    this.gameRooms = [];
  }

  findGameRoom(roomId='') {
    return this.gameRooms.find(r => r.roomId === roomId);
  }

  sendEnterMes(socket, { roomId, user, }) {
    socket.to(roomId).emit(SOCKET_EVENT.GAME_STATUS, {
      gameStatus: GAME_STATUS.READY,
      message: `${user.id || user.name } successfully enter room: ${roomId}`
    });
  }
  

  enterGame(socket, { roomId, user, }) {
    this.sendEnterMes(socket, { roomId, user, });
    SocketRoom.enterRoom(socket)(roomId);
    const gameRoom = this.findGameRoom(roomId);
    if(gameRoom) {
      gameRoom.game.addPlayer(user);
      return gameRoom;
    } else {
      const _gameRoom = new GameSocket({
        socket,
        roomId,
        firstUser: user,
      });
      this.gameRooms.push(_gameRoom);
      return _gameRoom;
    }
  }

  handlePlayerExit(roomId='', userId='') {
    const gameRoom = this.findGameRoom(roomId);
    if(gameRoom) {
      const players = gameRoom.game.removePlayer(userId);
      if(players.length === 0) {
        // 刪掉該房間
        this.gameRooms = this.gameRooms.filter(g => g.roomId !== roomId);
        console.log(this.gameRooms);
        // update db
      }
    }
  }
}

module.exports = {
  emitMessage,
  GameSocket,
  GamesManager,
};