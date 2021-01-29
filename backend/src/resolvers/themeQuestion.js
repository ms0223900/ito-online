const ThemeQuestion = require("../model/ThemeQuestion.js");

const getThemeQuestions = async () => {
  try {
    const users = await ThemeQuestion.model.find();
    return users;
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

