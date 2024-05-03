const Sequelize = require("sequelize");
const seq = require("./db");

// User model
const User = seq.define("user", {
  // id 不用我们自己定义，因为 Sequelize 会自动生成
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  realname: {
    type: Sequelize.STRING,
  },

  // 创建时间 不用我们自己定义，因为 Sequelize 会自动生成
  // 更新时间 不用我们自己定义，因为 Sequelize 会自动生成
});

// Blog model
const Blog = seq.define("blog", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = {
  User,
  Blog,
};
