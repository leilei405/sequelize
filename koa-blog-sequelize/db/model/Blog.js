const Sequelize = require("sequelize");
const seq = require("../seq");

// Blog model
const Blog = seq.define("blog", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT, // Text 存储大文件
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Blog;
