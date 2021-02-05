const {
  GAME_STATUS, PLAYED_RESULT,
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
    minPlayersAmount=2, // 最少遊玩人數
    initLife=3,
    cardAmount=100,
  }) {
    this.minPlayersAmount = minPlayersAmount;
    this.initLife = initLife;
    this.passedRounds = 0;
    this.init();
    this.cards = this.makeRandomCards(cardAmount);
    this.questions = [];
  }

  init() {
    this.cardsOnDesk = [];
    this.users = [];
    this.life = this.initLife;
    this.latestCard = Infinity; // 第一張卡一定沒問題
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
  findPlayerIndex(userId='') {
    return this.users.findIndex(u => u.id === userId);
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
  updateUserCardPlayed(userId) {
    const userIdx = this.findPlayerIndex(userId);
    if(userIdx !== -1) {
      this.users[userIdx].isCardPlayed = true;
    }
  }
  getCompareCardResult(card=0) {
    return this.latestCard > card;
  }
  compareCard({
    userId, cardNumber,
  }) {
    // 更新卡片已經出過
    this.updateUserCardPlayed(userId);
    const isSuccess = this.getCompareCardResult(cardNumber);
    const thisRoundOver = this.checkThisRoundOver();

    if(!isSuccess) {
      this.life = this.life - 1;
    }
    
    const latestLife = this.life;
    const playedResult = {
      userId,
      prevCard: this.latestCard,
      latestCard: cardNumber,
      latestLife,
    };

    let payload = {
      gameStatus: GAME_STATUS.SET_PLAYED_RESULT,
      resultType: PLAYED_RESULT.CONTINUED,
      passedRounds: this.passedRounds,
      playedResult,
    };

    // 該回合結束
    if(thisRoundOver) {
      if(this.life > 0) {
        this.passedRounds += 1;
        payload = {
          ...payload,
          passedRounds: this.passedRounds,
        };
      } else {
        payload = ({
          ...payload,
          resultType: PLAYED_RESULT.GAME_OVER,
        });
      }
    }
    // 繼續該回合
    else {
      if(isSuccess) {
        payload = ({
          ...payload,
          resultType: PLAYED_RESULT.SUCCESS,
        });
      } else {
        payload = ({
          ...payload,
          resultType: PLAYED_RESULT.FAIL,
        });
      }
    }
    console.log(payload);
    // update latest card
    this.latestCard = cardNumber;
    return payload;
  }

  checkPlayersAmountdFulfill() {
    return this.users.length >= this.minPlayersAmount;
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

  checkThisRoundOver() {
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

  async getRandomQuestion() {
    if(this.questions.length === 0) {
      const queriedQuestions = await getThemeQuestions();
      this.questions = queriedQuestions;
    }
    const question = _.shuffle(this.questions)[0];
    return question;
  }

  async getQuestionAndCard() {
    const question = await this.getRandomQuestion();
    console.log(question);

    if(!question) {
      return ({
        gameStatus: GAME_STATUS.ERROR,
        message: 'question-not-found',
      });
    } else {
      const cardsAmount = this.users.length;
      const cards = this.getSomeCards(cardsAmount);
      const life = {
        lifeNow: this.life,
        maxLife: this.initLife,
      };

      const playerCardAndQuestionList = cards.map((card, i) => ({
        gameStatus: GAME_STATUS.START,
        player: this.users[i],
        question,
        latestCard: this.latestCard,
        card,
        life,
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