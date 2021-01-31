const { model, Schema } = require('mongoose');
const {
  userSchema
} = require('./User.js');

const schema = new Schema({
  name: String,
  players: [
    userSchema,
  ]
});

module.exports = {
  model: model('Room', schema),
  schema,
};