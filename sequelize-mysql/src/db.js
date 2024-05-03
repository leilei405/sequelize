const Sequelize = require("sequelize");

const config = {
  host: "localhost",
  dialect: "mysql",
};

// 生产环境下使用连接池（process.env.NODE.env）
config.pool = {
  max: 5, // 连接池最大连接数
  min: 0, // 连接池最小连接数
  idle: 20 * 1000, // 如果一个线程 10s 内没有被使用过，则断开连接
};

// sequelize-mysql 表示数据库名称r      root 用户名       root123456 密码
const seq = new Sequelize("sequelize-mysql", "root", "root123456", {
  ...config,
});

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log("连接成功");
  })
  .catch((err) => {
    console.log("连接失败", err);
  });

module.exports = seq;
