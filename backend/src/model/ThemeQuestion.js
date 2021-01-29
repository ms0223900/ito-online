const { model, Schema } = require('mongoose');

const schema = new Schema({
  content: String,
});

module.exports = {
  model: model('ThemeQuestion', schema),
  schema,
};