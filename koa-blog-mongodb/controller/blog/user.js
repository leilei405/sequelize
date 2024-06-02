const { genPassword } = require("../../utils/cryp");
const User = require("../../db/models/User");
const login = async (username, password) => {
  // mongodb 改造
  password = genPassword(password);
  const userList = await User.find({ username, password });
  if (userList.length === 0) return {};
  return userList[0];
};

const registerCheck = async (username, password, realname, status) => {};

module.exports = {
  login,
  registerCheck,
};
