const {
  SOCKET_EVENT,
} = require('../../config.js');
const _ = require('lodash');
const { getThemeQuestions } = require('../resolvers/themeQuestion.js');

const emitMessage = (socket, roomId='') => () => {
  // const namespace = io.of('/');

  console.log('Rooms', socket.rooms);
  socket.to(roomId).emit('room-mes', {
    message: `message from room: ${roomId}`
  });
};

const initUser = {
  id: '',
  name: '',
};
const initPlayer = {
  ...initUser,
  isReady: false,
};

const GAME_STATUS = {
  READY: 'READY',
  START: 'START',
  CONTINUED: 'CONTINUED',
  OVER: 'OVER',
  ERROR: 'ERROR',
};

const USER_ACTION = {
  PLAY_CARD: 'PLAY_CARD',
  SET_READY: 'SET_READY',
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

class ItoGame {
  constructor({
    initLife=3,
    cardAmount=100
  }) {
    this.life = initLife;
    this.players = [];
    this.cards = this.makeRandomCards(cardAmount);
    this.latestCard = Infinity;
  }

  addPlayer(user) {
    this.players = [
      ...this.players,
      user,
    ];
  }
  removePlayer(userId='') {
    this.players = this.players.filter(p => p.id !== userId);
  }

  makeRandomCards(cardAmount=100) {
    const cards = [...Array(cardAmount).keys()].map(k => k + 1);
    const res = _.shuffle(cards);
    return res;
  }
  updateCard() {

  }
 
  compareCard(card) {
    let payload = {};

    const isSuccess = this.latestCard > card;
    this.latestCard = card;
    if(this.life - 1 > 0) {  
      this.life = isSuccess ? this.life : this.life - 1;
      payload = {
        gameStatus: GAME_STATUS.CONTINUED,
        life: this.life,
      };
    } else {
      payload = {
        gameStatus: GAME_STATUS.OVER,
      };
    }

    return payload;
  }

  getSomeCards(cardsAmount=3) {
    if(cardAmount > this.cards.length) {
      throw new Error('Too many card request.');
    }
    const cards = this.cards.slice(0, cardsAmount);
    const remainCards = this.cards.slice(cardsAmount);
    this.cards = remainCards;
    return cards;
  }

  async getQuestionAndCard() {
    const questions = await getThemeQuestions();
    console.log(questions);

    if(questions.length === 0) {
      return ({
        gameStatus: GAME_STATUS.ERROR,
        message: 'question-not-found',
      });
    } else {
      const question = _.shuffle(questions)[0];
      const cardsAmount = this.players.length;
      const cards = this.getSomeCards(cardsAmount);
      const playloadList = cards.map(card => ({
        gameStatus: GAME_STATUS.START,
        message: 'success',
        question,
        card,
      }));
      return playloadList;
    }
  }

  getGameStatus() {

  }
}

class GameSocket {
  constructor({
    roomId='',
    socket={},
    gameStatus=GAME_STATUS.READY,
    firstUser,
  }) {
    this.roomId = roomId;
    this.gameStatus = gameStatus;
    this.socket = socket;
    this.game = new ItoGame();
    firstUser && this.game.addPlayer(firstUser);
  }

  onListenUserActions() {
    this.socket.on(SOCKET_EVENT.USER_ACTION, e => {
      if(e) {
        switch (e.userActionType) {
        case USER_ACTION.PLAY_CARD:
          if(e.cardNumber) {
            this.sendCardComparedResult(e.cardNumber);
          }
        case USER_ACTION.SET_READY:
          const { isReady, userId, } = e;
          this.setPlayerReady({ isReady, userId, });
        default:
          break;
        }
      }
    });
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
    return !this.game.players.find(p => !p.isReady);
  }

  initGame() {
    this.onListenUserActions();
  }

  sendGameStart() {
    this.game.getQuestionAndCard()
      .then(res => {
        if(res.length > 0) {
          for (const payload of res) {
            this.socket.to(this.roomId).emit(payload);
          }
        }
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

  sendCardComparedResult(cardNumber=0) {
    const res = this.game.compareCard(cardNumber);
    this.socket.emit(SOCKET_EVENT.COMPARED_RESULT, res);
  }
}

class GamesManager {
  constructor() {
    this.gameRooms = [];
  }

  getGameRoom(roomId='') {
    return this.gameRooms.find(r => r.roomId === roomId);
  }

  enterGame(socket, { roomId, user, }) {
    SocketRoom.enterRoom(socket)(roomId);
    const gameRoom = this.getGameRoom(roomId);
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
}

module.exports = {
  emitMessage,
  GameSocket,
  GamesManager,
};