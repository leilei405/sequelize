const env = process.env.NODE_ENV; // 获取环境变量参数
let MYSQL_CONFIG = {}; // 配置对象
let REDIS_CONFIG = {}; //

// 开发环境
if (env === "dev") {
  // mysql
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "root123456",
    port: "3306",
    database: "blogquestion",
  };

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1",
  };
}

// 生产环境
if (env === "production") {
  // mysql
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "root123456",
    port: "3306",
    database: "blogquestion",
  };

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
};
