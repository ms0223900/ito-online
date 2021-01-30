const {
  SOCKET_EVENT,
} = require('../../config.js');
const {
  io,
} = require('../../index.js');
const { getThemeQuestions } = require('../resolvers/themeQuestion.js');
const _ = require('lodash');

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
  isCardPlayed: false,
  cardNow: null,
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
    this.initLife = initLife;
    this.passedRounds = 0;
    this.init();
    this.cards = this.makeRandomCards(cardAmount);
  }

  init() {
    this.cardsOnDesk = [];
    this.players = [];
    this.life = this.initLife;
    this.latestCard = Infinity;
  }

  initPlayer() {

  }
  addPlayer(user) {
    const newPlayer = {
      ...initPlayer,
      ...user,
    };
    this.players = [
      ...this.players,
      newPlayer,
    ];
  }
  removePlayer(userId='') {
    this.players = this.players.filter(p => p.id !== userId);
    return this.players;
  }

  makeRandomCards(cardAmount=100) {
    const cards = [...Array(cardAmount).keys()].map(k => k + 1);
    const res = _.shuffle(cards);
    return res;
  }
  updateCard() {

  }
 
  compareCard(card) {
    let payload = {
      gameStatus: GAME_STATUS.CONTINUED,
    };

    const isSuccess = this.latestCard > card;
    this.latestCard = card;
    if(isSuccess) {
      const thisRoundPassed = this.checkThisRoundPassed();
      this.passedRounds += 1;
      if(thisRoundPassed) {
        payload = ({
          gameStatus: GAME_STATUS.PASS,
          passedRounds,
        });
      } else {
        payload = ({
          gameStatus: GAME_STATUS.CONTINUED,
          life: this.life,
        });
      }
    } else {
      this.life = this.life - 1;
      if(this.life > 0) { 
        payload = ({
          gameStatus: GAME_STATUS.CONTINUED,
          life: this.life,
        });
      } else {
        payload = ({
          gameStatus: GAME_STATUS.OVER,
          passedRounds,
        });
      }
    }
    return payload;
  }

  updatePlayerByCard() {

  }

  checkThisRoundPassed() {
    const allCardsPlayed = this.players.every(p => p.isCardPlayed);
    return allCardsPlayed;
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

      const payloadList = cards.map(card => ({
        gameStatus: GAME_STATUS.START,
        message: 'success',
        question,
        card,
      }));
      return payloadList;
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
    this.game = new ItoGame({});
    firstUser && this.game.addPlayer(firstUser);
  }

  initGame() {
    this.onListenUserActions();
  }

  onListenUserActions() {
    this.socket.on(SOCKET_EVENT.USER_ACTION, e => {
      if(e) {
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
    return !this.game.players.find(p => !p.isReady);
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