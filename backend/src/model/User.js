const { model, Schema } = require('mongoose');

const schema = new Schema({
  username: String,
});

module.exports = {
  userModel: model('User', schema),
  userSchema: schema,
};