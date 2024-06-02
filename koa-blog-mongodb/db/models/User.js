const mongoose = require("../db");

const Schema = mongoose.Schema;

// 定义一个Schema 数据规范
const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    realname: {
      type: String,
    },
  },
  { timestamps: true }
);

// 创建模型 对应 collection
const User = mongoose.model("user", UserSchema);

module.exports = User;
