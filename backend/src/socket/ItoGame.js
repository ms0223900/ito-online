const {
  GAME_STATUS,
} = require('../../config.js');
const _ = require('lodash');
const {
  getThemeQuestions,
} = require('../resolvers/themeQuestion');

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

class ItoGame {
  constructor({
    minPlayersAmount=3, // 最少遊玩人數
    initLife=3,
    cardAmount=100
  }) {
    this.minPlayersAmount = minPlayersAmount;
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

  getInitPlayer(user) {
    const newPlayer = {
      ...initPlayer,
      ...user,
    };
    return newPlayer;
  }
  addPlayer(user) {
    const player = this.getInitPlayer(user);
    this.players = [
      ...this.players,
      player,
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
  getCompareCardResult(card=0) {
    return this.latestCard > card;
  }
  compareCard(card) {
    let payload = {
      gameStatus: GAME_STATUS.CONTINUED,
    };

    const isSuccess = this.getCompareCardResult(card);
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

  checkPlayersAmountdFulfill() {
    return this.players.length > this.minPlayersAmount;
  }
  checkAllPlayerAreReady() {
    return this.players.every(p => p.isReady);
  }
  checkPlayersReadyAndFulfill() {
    return (this.checkPlayersAmountdFulfill() && this.checkAllPlayerAreReady());
  }
  setPlayerReady({
    isReady=false,
    userId='',
  }) {
    const playerIdx = this.players.findIndex(p => p.id === userId);
    if(playerIdx !== -1) {
      this.players[playerIdx].isReady = isReady;
    }
  }

  checkThisRoundPassed() {
    const allCardsPlayed = this.players.every(p => p.isCardPlayed);
    return allCardsPlayed;
  }

  getSomeCards(cardsAmount=3) {
    if(cardsAmount > this.cards.length) {
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

      const playerCardAndQuestionList = cards.map((card, i) => ({
        gameStatus: GAME_STATUS.START,
        player: this.players[i],
        question,
        card,
      }));

      const payload = {
        gameStatus: GAME_STATUS.START,
        message: 'game-start-successfully',
        playerCardAndQuestionList,
      };
      return payload;
    }
  }

  getGameStatus() {

  }
}

module.exports = {
  ItoGame,
};