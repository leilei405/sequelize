const User = require("../db/model/User");

/**
 * 登录函数
 *
 * @param username 用户名
 * @param password 密码
 * @returns 返回用户信息对象，若用户不存在则返回null
 */
async function login(username, password) {
  const user = await User.findOne({
    where: {
      username,
      password,
    },
  });
  if (user == null) return null;
  return user.dataValues;
}

module.exports = {
  login,
};
