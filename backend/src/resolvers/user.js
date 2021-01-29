const User = require("../model/User");

const getUsers = async () => {
  try {
    const users = await User.userModel.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (_, { username, }, ctx) => {
  
};

module.exports = {
  getUsers,
  createUser,
};