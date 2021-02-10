const _ = require('lodash');
const ThemeQuestion = require("../model/ThemeQuestion.js");

const mockQuestions = [
  {
    _id: '0001',
    id: '1',
    content: '各種天氣現象的「不舒適」程度。',
  },
  {
    _id: '0002',
    id: '2',
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

const createThemeQuestion = async (_, { content, supplement, }, ctx) => {
  const newQuestion = new ThemeQuestion.model({
    content,
    supplement,
  });
  console.log('New Question: ', newQuestion);
  const question = await newQuestion.save();
  return question;
};

const deleteThemeQuestion = async (_, { id, }, ctx) => {
  try {
    // const rooms = await Room.model.find();
    await ThemeQuestion.model.findByIdAndDelete(id, _, (err, _, res) => {
      console.log(res);
    });
    return ({
      message: `ThemeQuestion: ${id} deleted successfully.`
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getThemeQuestions,
  getRandomThemeQuestion,
  createThemeQuestion,
  deleteThemeQuestion,
};

