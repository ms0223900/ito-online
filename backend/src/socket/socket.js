const {
  SOCKET_EVENT, GAME_STATUS, USER_ACTION,
} = require('../../config.js');
const { createRoom } = require('../resolvers/room.js');
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
const getUserName = (user) => (
  user.id || user.name
);

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
    gameStatus=GAME_STATUS.READY,
    firstUser,
  }) {
    this.roomId = roomId;
    this.gameStatus = gameStatus;
    this.io = io;
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
          this.game.setPlayerReady({ isReady, userId, });
          const allAreReady = this.game.checkPlayersReadyAndFulfill();
          if(allAreReady) {
            this.sendGameStart();
          } else {
            this.sendPlayerReady({ userId, isReady, });
          }
          console.log(allAreReady);
        }
        default:
          break;
        }
      }
    });
    return () => this.removeListeners(socket);
  }
  removeListeners(socket) {
    socket.removeAllListeners([
      SOCKET_EVENT.USER_ACTION,
    ]);
  }
  sendAllInRoom(payload, socketEvent=SOCKET_EVENT.GAME_STATUS) {
    this.io
      .in(this.roomId)
      .emit(socketEvent, payload);
  }
  sendPlayerReady({ userId, isReady }) {
    // 送全部
    // this.sendAllInRoom({
    //   players: this.game.players,
    // });
    // 送一個
    this.sendAllInRoom({
      gameStatus: GAME_STATUS.UPDATE_READY,
      userId, 
      isReady 
    });
  }
  sendGameStart() {
    this.game.getQuestionAndCard()
      .then(payload => {
        this.sendAllInRoom(payload);
      })
      .catch(e => {
        console.log(e);
      });
  }
  makeEnterMes({ roomId, user, }) {
    return ({
      gameStatus: GAME_STATUS.READY,
      players: this.game.players,
      message: `${getUserName(user)} successfully enter room: ${roomId}`
    });
  }
  sendEnterMes({ roomId, user, }) {
    const payload = this.makeEnterMes({ roomId, user, });
    this.sendAllInRoom(payload);
  }

  sendCardComparedResult({ userId, cardNumber, }) {
    const res = this.game.compareCard({ userId, cardNumber, });
    if(res.gameStatus === GAME_STATUS.PASS || 
      res.gameStatus === GAME_STATUS.OVER
    ) {
      this.game.init();
    }
    this.sendAllInRoom(res, SOCKET_EVENT.COMPARED_RESULT);
  }
}

class GamesManager {
  constructor() {
    this.gameRooms = [];
  }

  findGameRoom(roomId='') {
    return this.gameRooms.find(r => r.roomId === roomId);
  }
  
  enterGame(io, socket, { roomId, user, }) {
    return async (updateRoomCb,) => {
      SocketRoom.enterRoom(socket)(roomId);
      let gameRoom = this.findGameRoom(roomId);
      console.log(gameRoom);
      if(gameRoom) {
        // update room
        gameRoom.game.addPlayer(user);
        updateRoomCb && updateRoomCb({
          type: 'ADD_PLAYER',
          roomId,
          user,
        });
      } else {
        // 資料的create不在這邊
        // const newRoom = await createRoom({}, {
        //   firstUser: user,
        // });
        // create new room
        const newGameRoom = new GameSocket({
          io,
          socket,
          roomId,
          firstUser: user,
        });
        this.gameRooms.push(newGameRoom);
        gameRoom = newGameRoom;
      }
      gameRoom.sendEnterMes({ roomId, user, });
    
      return gameRoom;
    };
  }

  handlePlayerExit(roomId='', userId='') {
    return (removeRoomCb, updateRoomCb) => {
      const gameRoom = this.findGameRoom(roomId);

      if(gameRoom) {
        const players = gameRoom.game.removePlayer(userId);
        if(players.length === 0) {
          // 刪掉該房間
          this.gameRooms = this.gameRooms.filter(g => g.roomId !== roomId);
          console.log(this.gameRooms);
          // update db
          removeRoomCb && removeRoomCb({ roomId, });
        } else {
          updateRoomCb && updateRoomCb({
            type: 'REMOVE_PLAYER',
            roomId,
            user: { id: userId, },
          });
        }
      }

    };
  }
}

module.exports = {
  emitMessage,
  GameSocket,
  GamesManager,
};