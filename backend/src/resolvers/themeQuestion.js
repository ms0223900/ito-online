const _ = require('lodash');
const ThemeQuestion = require("../model/ThemeQuestion.js");

const mockQuestions = [
  {
    content: '各種天氣現象的「不舒適」程度。',
  },
  {
    content: 'Onepiece角色的強弱程度。',
  }
];

const getThemeQuestions = async () => {
  try {
    // const questions = await ThemeQuestion.model.find();
    const questions = mockQuestions;
    return questions;
  } catch (error) {
    throw new Error(error);
  }
};

const getRandomThemeQuestion = async () => {
  const questions = await getThemeQuestions();
  const question = _.shuffle(questions)[0];
  return question;
};

const createThemeQuestions = async (_, { content, }, ctx) => {
  
};

module.exports = {
  getThemeQuestions,
  getRandomThemeQuestion,
  createThemeQuestions,
};

