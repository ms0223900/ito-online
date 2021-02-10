const { createThemeQuestion, deleteThemeQuestion, getThemeQuestions } = require("../resolvers/themeQuestion");

const questionPost = (app) => app.post('/theme-question', async (req, res) => {
  try {
    if(!req.body || !req.body.type) {
      const errMes = 'Please add type, such as CREATE or DELETE.';
      res.status(400).send({
        message: errMes
      });
      return;
    }

    const {
      body: {
        type, content, supplement, id,
      }
    } = req;
    switch (type) {
    case 'CREATE':
      if(content && supplement) {
        const question = await createThemeQuestion({}, {
          content,
          supplement,
        });
        res.send(question);
      } else {
        const errMes = 'Content or supplement is not provided.';
        res.status(400).send({
          message: errMes
        });
      }
      break;
    case 'DELETE':
      if(id) {
        const _res = await deleteThemeQuestion({}, { id, });
        res.send(_res);
      } else {
        const errMes = 'Id is not provided or empty.';
        res.status(400).send({
          message: errMes
        });
      }
      break;
    default:
      const errMes = 'Only CREATE, DELETE are supported.';
      res.status(400).send({
        message: errMes
      });
      break;
    }
  } catch (error) {
    console.log(error);
  }
});

const questionGet = app => app.get('/theme-questions', async (req, res) => {
  const questions = await getThemeQuestions();
  res.send(questions);
});

function useThemeQuestionRoutes(app) {
  questionPost(app);
  questionGet(app);
}

module.exports = {
  useThemeQuestionRoutes,
};