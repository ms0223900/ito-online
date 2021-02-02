const {
  GAME_STATUS,
} = require('../../config.js');
const _ = require('lodash');
const {
  getThemeQuestions, getRandomThemeQuestion,
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
    this.users = [];
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
    this.users = [
      ...this.users,
      player,
    ];
  }
  removePlayer(userId='') {
    this.users = this.users.filter(p => p.id !== userId);
    return this.users;
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
    return this.users.length > this.minPlayersAmount;
  }
  checkAllPlayerAreReady() {
    return this.users.every(p => p.isReady);
  }
  checkPlayersReadyAndFulfill() {
    return (this.checkPlayersAmountdFulfill() && this.checkAllPlayerAreReady());
  }
  setPlayerReady({
    isReady=false,
    userId='',
  }) {
    const playerIdx = this.users.findIndex(p => p.id === userId);
    if(playerIdx !== -1) {
      this.users[playerIdx].isReady = isReady;
    }
  }

  checkThisRoundPassed() {
    const allCardsPlayed = this.users.every(p => p.isCardPlayed);
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
    const question = await getRandomThemeQuestion();
    console.log(questions);

    if(!question) {
      return ({
        gameStatus: GAME_STATUS.ERROR,
        message: 'question-not-found',
      });
    } else {
      const cardsAmount = this.users.length;
      const cards = this.getSomeCards(cardsAmount);

      const playerCardAndQuestionList = cards.map((card, i) => ({
        gameStatus: GAME_STATUS.START,
        player: this.users[i],
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