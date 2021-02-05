const {
  SOCKET_EVENT, GAME_STATUS, USER_ACTION, PLAYED_RESULT,
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
    minPlayersAmount,
  }) {
    this.roomId = roomId;
    this.gameStatus = gameStatus;
    this.io = io;
    this.game = new ItoGame({
      minPlayersAmount,
    });
    this.removeListenerCb = undefined;
    this.usersConfirmedStatus = [];
    firstUser && this.game.addPlayer(firstUser);
  }

  initGame(socket, io) {
    this.io = io;
    this.usersConfirmedStatus = [];
    this.removeListenerCb = this.onListenUserActions(socket);
  }

  checkAllUsersAreSendRequest() {
    return this.usersConfirmedStatus.length === this.game.users.length;
  }
  getUsersContinueOrLeaveGamePayload() {
    const allAreSend = this.checkAllUsersAreSendRequest();
    console.log(`AllAreSend: ${allAreSend}`);
    if(allAreSend) {
      const usersContinue = this.usersConfirmedStatus.filter(u => (
        u === USER_ACTION.CONFIRM_CONTINUE_GAME
      ));

      if(usersContinue.length >= this.game.minPlayersAmount) {
        return ({
          gameStatus: GAME_STATUS.SET_CONTINUE_GAME_SUCCESS,
        });
      } else {
        return ({
          gameStatus: GAME_STATUS.SET_CONTINUE_GAME_FAIL,
        });
      }
    } else {
      return undefined;
    }
  }

  onListenUserActions(socket, actions) {
    console.log('Listening user actions...');
    socket.on(SOCKET_EVENT.USER_ACTION, e => {
      if(e) {
        console.log(`Action: `, e);
        switch (e.userActionType) {
        case USER_ACTION.PLAY_CARD: {
          const { userId, cardNumber, } = e;
          if(userId && cardNumber) {
            this.sendCardComparedResult({ userId, cardNumber, });
          }
          break;
        }
        case USER_ACTION.SET_READY: {
          const { isReady, userId, } = e;
          this.game.setPlayerReady({ isReady, userId, });
          const allAreReady = this.game.checkPlayersReadyAndFulfill();
          console.log('All are ready: ', allAreReady);
          
          if(allAreReady) {
            this.sendGameStart();
          } else {
            // this.sendPlayerReady({ userId, isReady, });
            this.sendAllPlayerReady();
          }
          console.log(allAreReady);
          break;
        }
        case USER_ACTION.CONFIRM_CONTINUE_GAME:
        case USER_ACTION.CONFIRM_LEAVE_GAME: {
          this.usersConfirmedStatus.push(e.userActionType);
          const payload = this.getUsersContinueOrLeaveGamePayload();
          console.log(payload);

          if(payload) {
            if(payload.gameStatus === GAME_STATUS.SET_CONTINUE_GAME_SUCCESS) {
              console.log(`Room ${this.roomId} game is continued.`);
              this.sendGameContinued();
            } else {
              this.sendAllInRoom(payload, );
            }
            this.usersConfirmedStatus = [];
          }
          break;
        }
        case USER_ACTION.GET_ALL_PLAYERS_READY: {
          // 給sender目前room最新狀態
          this.sendAllPlayerReady(socket);
          break;
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
    // 送一個
    this.sendAllInRoom({
      gameStatus: GAME_STATUS.UPDATE_READY,
      userId, 
      isReady 
    });
  }
  sendAllPlayerReady(socket) {
    // 只傳給sender
    const payload = {
      gameStatus: GAME_STATUS.UPDATE_ALL_USERS,
      users: this.game.users,
    };
    // socket.emit(SOCKET_EVENT.GAME_STATUS, payload);
    this.sendAllInRoom(payload);
  }

  sendAddPlayer({ user, }) {
    this.sendAllInRoom({
      gameStatus: GAME_STATUS.ADD_PLAYER,
      user,
    });
  }
  sendRemovePlayer({ userId, }) {
    this.sendAllInRoom({
      gameStatus: GAME_STATUS.REMOVE_PLAYER,
      userId,
    });
  }

  sendGameStart() {
    this.game.getQuestionAndCard()
      .then(payload => {
        console.log('Game start.');
        this.sendAllInRoom(payload);
      })
      .catch(e => {
        console.log(e);
      });
  }

  sendGameContinued() {
    this.game.initForContinue();
    this.sendGameStart();
  }

  makeEnterMes({ roomId, user, }) {
    return ({
      gameStatus: GAME_STATUS.READY,
      users: this.game.users,
      message: `${getUserName(user)} successfully enter room: ${roomId}`
    });
  }
  sendEnterMes({ roomId, user, }) {
    const payload = this.makeEnterMes({ roomId, user, });
    this.sendAllInRoom(payload);
  }

  sendCardComparedResult({ userId, cardNumber, }) {
    const res = this.game.compareCard({ userId, cardNumber, });
    // 不在這邊做init，因為continue不一定成功
    this.sendAllInRoom(res);
  }
}

class GamesManager {
  constructor() {
    this.gameRooms = [];
  }

  findGameRoom(roomId='') {
    return this.gameRooms.find(r => r.roomId === roomId);
  }
  
  enterGame(io, socket, { 
    roomId, 
    user, 
    minPlayersAmount,
  }) {
    return async (updateRoomCb,) => {
      console.log(`User: ${user.id} enter room: ${roomId}`);
      SocketRoom.enterRoom(socket)(roomId);
      let gameRoom = this.findGameRoom(roomId);
      // console.log(gameRoom);
      if(gameRoom) {
        // update room
        // 給所有人通知
        gameRoom.game.addPlayer(user);
        gameRoom.sendAddPlayer({ user, });
      } else {
        const newGameRoom = new GameSocket({
          io,
          socket,
          roomId,
          firstUser: user,
          minPlayersAmount,
        });
        this.gameRooms.push(newGameRoom);
        gameRoom = newGameRoom;
      }
      updateRoomCb && updateRoomCb({
        type: 'ADD_PLAYER',
        roomId,
        user,
      });
      gameRoom.sendEnterMes({ roomId, user, });
    
      return gameRoom;
    };
  }

  handlePlayerExit(roomId='', userId='') {
    return (removeRoomCb, updateRoomCb) => {
      const gameRoom = this.findGameRoom(roomId);

      if(gameRoom) {
        const users = gameRoom.game.removePlayer(userId);
        gameRoom.sendRemovePlayer({ userId, });
        gameRoom.removeListenerCb && gameRoom.removeListenerCb();
        
        updateRoomCb && updateRoomCb({
          type: 'REMOVE_PLAYER',
          roomId,
          user: { id: userId, },
        });
        
        if(users.length === 0) {
          // 先不刪掉該房間
          this.gameRooms = this.gameRooms.filter(g => g.roomId !== roomId);
          console.log(this.gameRooms);
          // update db
          // removeRoomCb && removeRoomCb({ roomId, });
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