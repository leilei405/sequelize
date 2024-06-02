const { exec, escape } = require("../../db/mysql");
const { genPassword } = require("../../utils/cryp");
const login = async (username, password) => {
  // 假数据使用
  username = escape(username);
  password = genPassword(password);
  password = escape(password);
  let sql = `select username, realname from bloguser where username=${username} and password=${password}`;
  const rows = await exec(sql);
  return rows[0] || {};
  // return exec(sql).then((rows) => {
  //   return rows[0] || {};
  // });
};

const registerCheck = async (username, password, realname, status) => {
  username = escape(username);
  password = escape(password);
  realname = escape(realname);
  status = escape(status);
  let sql = `insert into bloguser (username, password, realname, status) values(${username}, ${password}, ${realname}, ${status})`;
  const res = await exec(sql);
  if (res.affectedRows > 0) {
    return true;
  }
  return false;
  // return exec(sql).then((res) => {
  //   if (res.affectedRows > 0) {
  //     return true;
  //   }
  //   return false;
  // });
};

module.exports = {
  login,
  registerCheck,
};
