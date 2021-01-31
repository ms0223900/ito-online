const { model, Schema } = require('mongoose');

const schema = new Schema({
  id: String,
  name: String,
});

module.exports = {
  userModel: model('User', schema),
  userSchema: schema,
};