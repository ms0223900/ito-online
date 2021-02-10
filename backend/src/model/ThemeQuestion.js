const { model, Schema } = require('mongoose');

const schema = new Schema({
  content: String,
  supplement: String,
});

module.exports = {
  model: model('ThemeQuestion', schema),
  schema,
};