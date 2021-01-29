const ThemeQuestion = require("../model/ThemeQuestion.js");

const mockQuestions = [
  {
    content: 'Are you...?',
  },
  {
    content: 'Hello World?',
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

const createThemeQuestions = async (_, { content, }, ctx) => {
  
};

module.exports = {
  getThemeQuestions,
  createThemeQuestions,
};

