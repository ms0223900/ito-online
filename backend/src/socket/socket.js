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

const GAME_STATUS = {
  READY: 'READY',
  START: 'START',
  OVER: 'OVER',
  ERROR: 'ERROR',
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
    cardAmount=100
  }) {
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
    this.players = this.players.filter(p => p.userId !== userId);
  }

  makeRandomCards(cardAmount=100) {
    const cards = [...Array(cardAmount).keys()].map(k => k + 1);
    const res = _.shuffle(cards);
    return res;
  }
  updateCard() {

  }
 
  compareCard(card) {
    const isSuccess = this.latestCard > card;
    this.latestCard = card;
    const payload = {
      life: isSuccess ? 0 : -1,
    };
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
        type: GAME_STATUS.ERROR,
        message: 'question-not-found',
      });
    } else {
      const question = _.shuffle(questions)[0];
      const cardsAmount = this.players.length;
      const cards = this.getSomeCards(cardsAmount);
      const playloadList = cards.map(card => ({
        type: GAME_STATUS.START,
        message: 'success',
        question,
        card,
      }));
      return playloadList;
    }
  }
}


class GameSocket {
  constructor({
    roomId='',
    socket={},
    initLife=3,
    gameStatus=GAME_STATUS.READY,
  }) {
    this.roomId = roomId;
    this.life = initLife;
    this.gameStatus = gameStatus;
    this.socket = socket;
    this.game = new ItoGame();
  }

  sendGameStart() {
    this.game.getQuestionAndCard()
      .then(res => {
        if(res.length > 0) {
          this.socket.to(this.roomId).emit();
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

module.exports = {
  emitMessage,
  GameSocket,
};