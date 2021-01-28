const { model, Schema } = require('mongoose');
const {
  userSchema
} = require('./User.js');

const schema = new Schema({
  name: String,
  users: [
    userSchema,
  ]
});

module.exports = model('Room', schema);