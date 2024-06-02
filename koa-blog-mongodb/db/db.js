const mongoose = require("mongoose");

const DBURL = "mongodb://127.0.0.1:27017/myblog";

mongoose.connect(DBURL);

mongoose.connection.on("open", () => {
  console.log("连接成功");
});

mongoose.connection.on("error", () => {
  console.log("连接出错~~");
});

mongoose.connection.on("close", () => {
  console.log("连接关闭");
});

module.exports = mongoose;
